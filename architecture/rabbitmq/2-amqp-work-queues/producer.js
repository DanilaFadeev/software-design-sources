import amqplib from 'amqplib';

const config = {
	amqp: 'amqp://localhost:5672',
	queue: 'tasks'
};

(async () => {
	// connect to RabbitMQ broker
	const connection = await amqplib.connect(config.amqp);

	// open a new channel
	const channel = await connection.createChannel();

	// make sure that queue exists or create it
	await channel.assertQueue(config.queue, { durable: true });

	// start publishing a new message every 3 seconds
	let messageId = 1;
	setInterval(() => {
		const payload = {
			id: messageId++,
			executionTime: Math.round(Math.random() * 10)
		};

		// convert JSON payload to Buffer format
		const buffer = Buffer.from(JSON.stringify(payload));

		// publish the message with persistent flag (will be stored on disk)
		channel.sendToQueue(config.queue, buffer, { persistent: true });

		console.log(`Message ${payload.id} is published`);
	}, 3000);

	// close the connection once exit signal is received
	process.on('SIGINT', () => {
		console.log('Closing AMQP connection...');
		connection.close();
		process.exit(0);
	});
})();
