import amqplib from 'amqplib';

const config = {
	amqp: 'amqp://localhost:5672',
	queue: 'rpc_queue',
	prefetch: 1
};

const fibonacci = n => {
	if (n === 0 || n === 1) {
		return n;
	}
	return fibonacci(n - 1) + fibonacci(n - 2);
};

(async () => {
	const connection = await amqplib.connect(config.amqp);
	const channel = await connection.createChannel();

	// assert RPC queue for retrieving procedure calls
	await channel.assertQueue(config.queue, { durable: false });

	// limit a number of processing messages
	await channel.prefetch(config.prefetch);

	console.log('Start consuming messages');

	channel.consume(config.queue, message => {
		const n = parseInt(message.content.toString(), 10);

		const fibonacciNumber = fibonacci(n);
		const payload = Buffer.from(fibonacciNumber.toString());
		
		const { replyTo, correlationId } = message.properties;
		
		console.log(`Received number ${n}. ID: ${correlationId}. Reply to ${replyTo}`);
		channel.sendToQueue(replyTo, payload, { correlationId });

		// confirm processed message
		channel.ack(message);
	});

	process.on('SIGINT', () => {
		console.log('Closing AMQP connection...');
		connection.close();
		process.exit(0);
	});
})();
