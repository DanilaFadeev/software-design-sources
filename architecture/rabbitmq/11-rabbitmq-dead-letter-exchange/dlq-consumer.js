import amqplib from 'amqplib';

const config = {
	amqp: 'amqp://localhost:5672',
	queue: 'backup-requests',
	deadLetterExchange: 'dle.backup-requests'
};

(async () => {
	const connection = await amqplib.connect(config.amqp);
	const channel = await connection.createChannel();

	// assert a DLE with direct type
	await channel.assertExchange(config.deadLetterExchange, 'direct');

	// create a queue with random name for the current consumer
	const { queue } = await channel.assertQueue('', { exclusive: true });

	// bind queue to the Dead-Letter Exchange
	await channel.bindQueue(queue, config.deadLetterExchange, config.queue);

	channel.consume(queue, message => {
		const { content, properties: { headers } } = message;
		const deathReason = headers['x-first-death-reason']; // "rejected" | "expired" | "maxlen" | "delivery_limit"

		// print the message and it's rejection reason
		console.log(`[DLQ]: Message "${content.toString()}". Reason: "${deathReason}"`);
	}, { noAck: true });

	process.on('SIGINT', () => {
		console.log('Closing AMQP connection...');
		connection.close();
		process.exit(0);
	});
})();
