import amqplib from 'amqplib';

const config = {
	amqp: 'amqp://localhost:5672',
	queue: 'limited-queue',
	messagesLimit: 10
};

(async () => {
	const connection = await amqplib.connect(config.amqp);
	const channel = await connection.createChannel();

	// assert a queue with messages limit specified
	await channel.assertQueue(config.queue, { maxLength: config.messagesLimit });

	// publish 10 more messages than a limit
	for (let i = 1; i <= config.messagesLimit + 10; i++) {
		channel.sendToQueue(config.queue, Buffer.from(`Message #${i}`));
	}

	let totalMessagesReceived = 0;
	channel.consume(config.queue, message => {
		const content = message.content.toString();
		console.log(`Received message: ${content}`);

		totalMessagesReceived++;
	}, { noAck: true });

	process.on('SIGINT', () => {
		console.log(`Queue limit: ${config.messagesLimit}. Messages received: ${totalMessagesReceived}`);
		console.log('Closing AMQP connection...');
		connection.close();
		process.exit(0);
	});
})();
