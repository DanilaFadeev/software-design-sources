import amqplib from 'amqplib';

const config = {
	amqp: 'amqp://localhost:5672',
	queue: 'redelivery-queue'
};

(async () => {
	// open AMQP connection and create a channel 
	const connection = await amqplib.connect(config.amqp);
	const channel = await connection.createChannel();

	// assert a queue for publishing messages
	await channel.assertQueue(config.queue, { durable: true });

	// start producing messages every 3 seconds
	let messageId = 1;
	setInterval(() => {
		const payload = Buffer.from(`Message #${messageId++}`);
		channel.sendToQueue(config.queue, payload);

		console.log('Message is published');
	}, 3000);

	process.on('SIGINT', () => {
		connection.close();
		process.exit(0);
	});
})();
