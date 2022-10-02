import amqplib from 'amqplib';

const config = {
	amqp: 'amqp://localhost:5672',
	queue: 'redelivery-queue'
};

(async () => {
	// open AMQP connection and create a channel 
	const connection = await amqplib.connect(config.amqp);
	const channel = await connection.createChannel();

	// process only 1 message per time
	await channel.prefetch(1);

	// assert a queue for publishing messages
	await channel.assertQueue(config.queue, { durable: true });

	channel.consume(config.queue, message => {
		const { content, fields: { redelivered } } = message;
		const payload = content.toString();

		console.log(`Received: "${payload}". Redelivered: ${redelivered}`);
		
		// randomly accept the message or reject with requeueing
		if (Math.random() > 0.5) {
			console.log('Rejecting the message...');

			if (!redelivered) {
				console.log('Message appeared for the first time. Reject with requeue');
				channel.reject(message, true); // requeue is true by default
			} else {
				console.log('Message was already rejected. Reject it again with no requeue');
				channel.reject(message, false); // override requeue with false
			}
		} else {
			console.log('Accepting the message...')
			channel.ack(message);
		}
	});

	process.on('SIGINT', () => {
		connection.close();
		process.exit(0);
	});
})();
