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

	await channel.prefetch(1);

	// assert DLE to route dead-letter messages there
	await channel.assertExchange(config.deadLetterExchange, 'direct');

	// assert a queue with DLE configured
	await channel.assertQueue(config.queue, {
		maxLength: config.maxLength,
		deadLetterExchange: config.deadLetterExchange
		// deadLetterRoutingKey: 'failures' // we can also rewrite original routing key
	});

	console.log(`Start consuming messages...`);

	// the current consumer will be rejecting messages with a little delay
	channel.consume(config.queue, message => {
		console.log(`Received: ${message.content.toString()}`);

		// reject a message in 1.5 seconds
		setTimeout(() => {
			channel.reject(message, false);
			console.log('The message rejected without requeueing');
		}, 1500);
	});

	process.on('SIGINT', () => {
		console.log('Closing AMQP connection...');
		connection.close();
		process.exit(0);
	});
})();
