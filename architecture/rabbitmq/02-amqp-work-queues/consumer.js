import amqplib from 'amqplib';

const config = {
	amqp: 'amqp://localhost:5672',
	queue: 'tasks',
	prefetch: 1
};

(async () => {
	// connect to RabbitMQ broker
	const connection = await amqplib.connect(config.amqp);

	// open a new channel
	const channel = await connection.createChannel();

	// Tell RabbitMQ to not dispatch a new message
	// until the previous one is processed and acknowledged
	await channel.prefetch(config.prefetch);

	// make sure that queue exists or create it
	await channel.assertQueue(config.queue, { durable: true });

	const handler = message => {
		const { id, executionTime } = JSON.parse(message.content.toString());
		console.log(`Message ${id} received (execution time: ${executionTime})`);

		setTimeout(() => {
			console.log(`Message ${id} successfully processed`);

			// Notify the broker that message is processed
			// and can be removed from the queue
			channel.ack(message); 
		}, executionTime * 1000);
	}

	channel.consume(config.queue, handler, {
		noAck: false // enable manual acknowledgment, which is enabled by default :)
	}); 
	
	// close the connection once exit signal is received
	process.on('SIGINT', () => {
		console.log('Closing AMQP connection...');
		connection.close();
		process.exit(0);
	});
})();
