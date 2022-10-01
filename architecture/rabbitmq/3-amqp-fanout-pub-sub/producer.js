import amqplib from 'amqplib';

const config = {
	amqp: 'amqp://localhost:5672',
	exchange: 'logs'
};

// just a few helper functions to prettify log messages
const round = number => Math.round(number * 100) / 100;
const bytesToMb = bytes => round(bytes / 1024 / 1024);

(async () => {
	// connect to RabbitMQ broker
	const connection = await amqplib.connect(config.amqp);

	// open a new channel
	const channel = await connection.createChannel();

	// verify/create the fanout exchange that will route messages to all the bound queues
	await channel.assertExchange(config.exchange, 'fanout', { durable: false });

	setInterval(() => {
		// we are going to send the current memory usage as a log
		const { heapTotal, heapUsed } = process.memoryUsage();
		const memoryUsageLog = `Heap Memory: ${bytesToMb(heapUsed)}MB / ${bytesToMb(heapTotal)}MB (${round(heapUsed / heapTotal)}%)`;

		// publish log message to the exchange with no routing key (empty string)
		channel.publish(config.exchange, '', Buffer.from(memoryUsageLog));

		console.log('Log message is published');
	}, 1000);
	
	// close the connection once exit signal is received
	process.on('SIGINT', () => {
		console.log('Closing AMQP connection...');
		connection.close();
		process.exit(0);
	});
})();
