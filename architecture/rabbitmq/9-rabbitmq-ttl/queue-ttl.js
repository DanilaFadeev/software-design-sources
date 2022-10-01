import amqplib from 'amqplib';

const config = {
	amqp: 'amqp://localhost:5672',
	queue: 'time-to-live-queue'
};

(async () => {
	const connection = await amqplib.connect(config.amqp);
	const channel = await connection.createChannel();

	// Assert a queue with TTL of 1 second which means that all the
	// incoming messages will be deleted right after
	await channel.assertQueue(config.queue, { messageTtl: 1000 });

	// all the queue messages will be consumed one by one
	channel.prefetch(1);

	channel.consume(config.queue, message => {
		console.log(`Received: ${message.content.toString()}`);
		// simulate a delay of message processing
		setTimeout(() => channel.ack(message), 800);
	});

	channel.sendToQueue(config.queue, Buffer.from('1')); // will be picked almost immediately
	channel.sendToQueue(config.queue, Buffer.from('2')); // picked in 800ms right after the first one
	channel.sendToQueue(config.queue, Buffer.from('3')); // not picked within 1 second and removed by TTL

	process.on('SIGINT', () => {
		console.log('Closing AMQP connection...');
		connection.close();
		process.exit(0);
	});
})();
