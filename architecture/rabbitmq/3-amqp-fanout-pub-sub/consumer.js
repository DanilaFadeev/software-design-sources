import amqplib from 'amqplib';

const config = {
	amqp: 'amqp://localhost:5672',
	exchange: 'logs'
};

(async () => {
	// connect to RabbitMQ broker
	const connection = await amqplib.connect(config.amqp);

	// open a new channel
	const channel = await connection.createChannel();

	// assert the fanout exchange that will route messages to all the bound queues
	await channel.assertExchange(config.exchange, 'fanout', { durable: false });

	// assert a queue with an empty name (broker will generate unique queue name by its own)
	// and pass "exclusive: true" flag that will delete the queue once connection is closed
	const { queue } = await channel.assertQueue('', { exclusive: true });
	console.log(`Generated queue: ${queue}`);

	// bind created queue to the logs fanout exchange
	await channel.bindQueue(queue, config.exchange, '');

	const handler = message => {
		console.log(`[${queue}]: ${message.content.toString()}`);
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
