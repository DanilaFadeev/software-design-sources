import amqplib from 'amqplib';

const config = {
	amqp: 'amqp://localhost:5672',
	queue: 'backup-requests',
	maxLength: 5,
	deadLetterExchange: 'dle.backup-requests'
};

(async () => {
	const connection = await amqplib.connect(config.amqp);
	const channel = await connection.createChannel();

	// assert a queue with DLE configured
	await channel.assertQueue(config.queue, {
		maxLength: config.maxLength,
		deadLetterExchange: config.deadLetterExchange
	});

	// Publish new messages faster than consumer will reject them,
	// so some messages will be expiring or thrown away because of queue length limit
	setInterval(() => {
		channel.sendToQueue(config.queue, Buffer.from('Ping'), { expiration: 5000 });
		console.log(`Ping message published`);
	}, 1000);

	process.on('SIGINT', () => {
		console.log('Closing AMQP connection...');
		connection.close();
		process.exit(0);
	});
})();
