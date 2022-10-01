import amqplib from 'amqplib';

const isDefined = value => typeof value !== 'undefined';

const ContentType = {
	json: 'application/json',
	text: 'text/plain'
};

export default class AmqpClient {

	config = null;

	channel = null;

	#exchangeCache = {};

	#queueCache = {};

	constructor(config) {
		const defaults = {
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

	async connect() {
		if (this.channel) {
			return this.channel;
		}
		try {
			this.channel = await this.#openChannel();
		} catch (error) {
			this.channel = null;
			console.error(`Failed to connect: ${error.message}`);
		}
		return this.channel;
	}

	disconnect() {
		this.channel?.disconnect();
	}

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
