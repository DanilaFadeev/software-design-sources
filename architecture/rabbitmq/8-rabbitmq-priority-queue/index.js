import amqplib from 'amqplib';

const config = {
	amqp: 'amqp://localhost:5672',
	queue: 'priority-queue',
	messagesCount: 10
};

const priorities = [
	'Can be ignored',
	'Not important',
	'Normal',
	'Important',
	'Very important'
];

(async () => {
	const connection = await amqplib.connect(config.amqp);
	const channel = await connection.createChannel();

	// Assert a priority queue by using 'x-max-priority' argument
	// that indicates the maximum priority the queue should support
	await channel.assertQueue(config.queue, { maxPriority: 5 });

	// publish a bunch of messages with random priority
	for (let i = 0; i < config.messagesCount; i++) {
		const priority = Math.floor(Math.random() * 4) + 1;
		const payload = Buffer.from(priorities[priority]);

		channel.sendToQueue(config.queue, payload, { priority });
	}

	// consume all the published messages in the priority-based order
	channel.consume(config.queue, message => {
		const { content, properties: { priority } } = message;
		console.log(`Received message with priority ${priority}: ${content}`);
	});

	process.on('SIGINT', () => {
		console.log('Closing AMQP connection...');
		connection.close();
		process.exit(0);
	});
})();
