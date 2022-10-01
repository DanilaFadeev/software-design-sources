import crypto from 'crypto';
import amqplib from 'amqplib';

const config = {
	amqp: 'amqp://localhost:5672',
	queue: 'rpc_queue'
};

const requests = new Map();

(async () => {
	const connection = await amqplib.connect(config.amqp);
	const channel = await connection.createChannel();

	// assert RPC queue for requests publishing 
	await channel.assertQueue(config.queue, { durable: false });

	setInterval(() => {
		const requestId = crypto.randomUUID();
		const requestPayload = Math.round(Math.random() * 10) + 30;

		// save request to in-memory storage
		requests.set(requestId, { number: requestPayload });

		channel.sendToQueue(config.queue, Buffer.from(requestPayload.toString()), {
			replyTo: callbackQueue.queue,
			correlationId: requestId
		});

		console.log(`[${requestId}] Message is published: ${requestPayload}`);
	}, 1500);

	// assert RPC callback queue for responses
	const callbackQueue = await channel.assertQueue('', { exclusive: true });

	channel.consume(callbackQueue.queue, message => {
		const { content, properties: { correlationId } } = message;

		// skip the message if it was not sent by the current producer
		if (!requests.has(correlationId)) return;

		// update request details with the received response
		const fibonacci = parseInt(content.toString());
		requests.set(correlationId, { ...requests.get(correlationId), fibonacci });

		console.log(`[${correlationId}] Response received`);
	}, { noAck: true });

	process.on('SIGINT', () => {
		console.log(requests.values());
		
		connection.close();
		process.exit(0);
	});
})();
