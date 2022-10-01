import amqplib from 'amqplib';

const config = {
	amqp: 'amqp://localhost:5672',
	exchange: 'memory-logs'
};

// we can specify the consuming severity by the command line argument
const severity = process.argv[2] || 'info';

(async () => {
	// connect to RabbitMQ broker
	const connection = await amqplib.connect(config.amqp);

	// open a new channel
	const channel = await connection.createChannel();

	// assert the direct exchange
	await channel.assertExchange(config.exchange, 'direct', { durable: false });

	// assert a queue with an empty name that will be removed automatically
	const { queue } = await channel.assertQueue('', { exclusive: true });
	console.log(`Generated queue: ${queue}`);

	// bind created queue to the memory-logs direct exchange using severity routing key
	await channel.bindQueue(queue, config.exchange, severity);

	const handler = message => {
		console.log(`[${severity}]: ${message.content.toString()}`);
	};

	// start consuming queue messages without acknowledge
	channel.consume(queue, handler, { noAck: true });
	
	// close the connection once exit signal is received
	process.on('SIGINT', () => {
		console.log('Closing AMQP connection...');
		connection.close();
		process.exit(0);
	});
})();
