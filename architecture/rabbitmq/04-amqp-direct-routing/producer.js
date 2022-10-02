import amqplib from 'amqplib';

const config = {
	amqp: 'amqp://localhost:5672',
	exchange: 'memory-logs'
};

// just a few helper functions to prettify log messages
const round = number => Math.round(number * 100) / 100;
const bytesToMb = bytes => round(bytes / 1024 / 1024);

(async () => {
	// connect to RabbitMQ broker
	const connection = await amqplib.connect(config.amqp);

	// open a new channel
	const channel = await connection.createChannel();

	// verify/create the direct exchange that will route messages to the bound queues
	// using severity as a routing key
	await channel.assertExchange(config.exchange, 'direct', { durable: false });

	setInterval(() => {
		// we are going to send the current memory usage as a log
		const { heapTotal, heapUsed } = process.memoryUsage();

		const usagePercent = heapUsed / heapTotal;
		const memoryUsageLog = `Heap Memory: ${bytesToMb(heapUsed)}MB / ${bytesToMb(heapTotal)}MB (${round(usagePercent)}%)`;

		// severity would be acting as a routing key
		const severity = usagePercent > 0.6 ? 'warning' : 'info';

		// publish log message to the exchange with no routing key (empty string)
		channel.publish(config.exchange, severity, Buffer.from(memoryUsageLog));

		console.log(`[${severity}] Log message is published`);
	}, 1000);
	
	// close the connection once exit signal is received
	process.on('SIGINT', () => {
		console.log('Closing AMQP connection...');
		connection.close();
		process.exit(0);
	});
})();
