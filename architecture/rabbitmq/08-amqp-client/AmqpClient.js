import amqplib from 'amqplib';

const isDefined = value => typeof value !== 'undefined';

export const ContentType = {
	json: 'application/json',
	text: 'text/plain'
};

export default class AmqpClient {

	config = null;

	channel = null;

	#exchangeCache = {};

	#queueCache = {};

	/**
	 * @param {{
	 * 	amqpUrl: string,
	 * 	prefetch: number,
	 * 	contentType: 'json' | 'text'
	 * }} config AmqpClient configuration
	 */
	constructor(config) {
		const defaults = {
			prefetch: 1,
			contentType: ContentType.json
		};

		this.config = Object.assign({}, defaults, config);

		if (!this.config.amqpUrl) {
			throw new Error('AMQP connection url must be provided');
		}
		if (!Object.values(ContentType).includes(this.config.contentType)) {
			throw new Error(`Content type "${this.config.type}" is not supported`);
		}
	}

	/**
	 * Opens a new AMQP connection and channel if not opened yet.
	 * @returns 
	 */
	async connect() {
		if (this.channel) {
			return this.channel;
		}
		try {
			this.channel = await this.#openChannel();
			this.channel.prefetch(this.config.prefetch);
		} catch (error) {
			this.channel = null;
			console.error(`Failed to connect: ${error.message}`);
		}
		return this.channel;
	}

	disconnect() {
		this.channel?.disconnect();
	}

	/**
	 * Publishes a new message with the routing key.
	 * 
	 * @param {string} exchange 
	 * @param {string} routingKey 
	 * @param {any} message 
	 * @param {*} options 
	 */
	async publish(exchange, routingKey, message, options) {
		await this.connect();

		const content = this.#encodeMessage(message);
		this.channel.publish(exchange, routingKey, content, {
			contentType: this.config.contentType,
			contentEncoding: 'utf-8',
			timestamp: Date.now(),
			appId: this.config.app
		});
	}

	/**
	 * Subscribes to the queue.
	 * 
	 * @param {string} queue Queue name
	 * @param {(message) => void} handler Queue messages handler
	 * @param {*} options Queue subscription options
	 */
	async subscribe(queue, handler, options) {
		await this.connect();

		this.channel.consume(queue, async message => {
			const { content, properties: { contentType } } = message;
			const payload = this.#decodeMessage(content, contentType);

			try {
				await handler(payload, message);
			} catch (error) {
				console.error(`Message handler failed: ${error.message}`);
			}

			this.channel.ack(message);
		}, options);
	}

	/**
	 * Explicitly assert an exchange. Caches the exchange once asserted.
	 * 
	 * @param {string} exchange The name of the exchange
	 * @param {'direct' | 'topic' | 'fanout' | 'headers' | 'match'} type Exchange type
	 * @param {{
	 * 	durable?: boolean,
	 * 	internal?: boolean,
	 * 	autoDelete?: boolean,
	 * 	alternateExchange?: string,
	 * 	arguments?: any
	 * }} [options] Exchange declaration options
	 * @returns {Promise<{
	 * 	exchange: string,
	 * 	messageCount: number,
	 * 	consumerCount: number
	 * }>} Exchange assertion result
	 */
	async assertExchange(exchange, type, options) {
		await this.connect();

		const optionsKey = this.#getExchangeOptionsKey(type, options);

		if (this.#exchangeCache[exchange]) {
			const { exchange: cachedExchange, optionsKey: key } = this.#exchangeCache[exchange];
			if (optionsKey !== key) {
				throw new Error('Exchange was already declared using different options');
			}
			return cachedExchange;
		}

		const assertion = await this.channel.assertExchange(exchange, type, options);
		this.#exchangeCache[exchange] = { exchange: assertion, optionsKey };

		return assertion;
	}

	/**
	 * Explicitly assert a queue. Caches the queue once asserted.
	 * 
	 * @param {string} queue The name of the queue
	 * @param {{
	 *  exclusive?: boolean,
	 * 	durable?: boolean,
	 * 	autoDelete?: boolean,
	 * 	arguments?: any,
	 * 	messageTtl?: number,
	 * 	expires?: number,
	 * 	deadLetterExchange?: string,
	 * 	deadLetterRoutingKey?: string,
	 * 	maxLength?: number,
	 * 	maxPriority?: number
	 * }} [options] Queue declaration options
	 * @returns {Promise<{ queue: string }>} Queue assertion result
	 */
	async assertQueue(queue, options) {
		await this.connect();

		const optionsKey = this.#getQueueOptionsKey(options);

		if (this.#queueCache[queue]) {
			const { queue: cachedQueue, optionsKey: key } = this.#queueCache[queue];
			if (optionsKey !== key) {
				throw new Error('Queue was already declared using different options');
			}
			return cachedQueue;
		}

		const assertion = await this.channel.assertQueue(queue, options);
		this.#queueCache[queue] = { queue: assertion, optionsKey };

		return assertion;
	}

	/**
	 * Binds queue to exchange by routing pattern.
	 * 
	 * @param {string} queue The name of the queue
	 * @param {*} exchange The name of the exchange
	 * @param {*} pattern Binding pattern
	 */
	async bindQueue(queue, exchange, pattern) {
		await this.connect();
		await this.channel.bindQueue(queue, exchange, pattern);
	}

	async #openChannel() {
		const connection = await amqplib.connect(this.config.amqpUrl);
		return connection.createChannel();
	}

	#encodeMessage(message) {
		const source = JSON.stringify(message);
		return Buffer.from(source);
	}

	#decodeMessage(buffer, contentType = ContentType.json) {
		switch (contentType) {
			case ContentType.json:
				return JSON.parse(buffer.toString());
			case ContentType.text:
				return buffer.toString();
			default:
				return buffer;
		}
	}

	#getExchangeOptionsKey(type, options = {}) {
		return [
			type,
			isDefined(options.durable) ? !!options.durable  : 'false',
			isDefined(options.internal) ? !!options.internal : 'false',
			isDefined(options.autoDelete) ? !!options.autoDelete : 'false'
		].join('_');
	}

	#getQueueOptionsKey(options = {}) {
		return [
			isDefined(options.durable) ? !!options.durable : 'false',
			isDefined(options.exclusive) ? !!options.exclusive  : 'false',
			isDefined(options.autoDelete) ? !!options.autoDelete : 'false'
		].join('_');
	}
}
