import amqplib from 'amqplib';

const config = {
	amqp: 'amqp://localhost:5672',
	queue: 'time-to-live-message'
};

(async () => {
	const connection = await amqplib.connect(config.amqp);
	const channel = await connection.createChannel();

	// assert a common queue without any TTL
	await channel.assertQueue(config.queue);

	// all the queue messages will be consumed one by one
	channel.prefetch(1);

	channel.consume(config.queue, message => {
		console.log(`Received: ${message.content.toString()}`);
		// simulate a delay of message processing
		setTimeout(() => channel.ack(message), 800);
	});

	channel.sendToQueue(config.queue, Buffer.from('1'), { expiration: 100 }); // ✅ handled
	channel.sendToQueue(config.queue, Buffer.from('2'), { expiration: 500 }); // 🚫 expired
	channel.sendToQueue(config.queue, Buffer.from('3'), { expiration: 1000 }); // ✅ handled
	channel.sendToQueue(config.queue, Buffer.from('4'), { expiration: 1500 }); // 🚫 expired
	channel.sendToQueue(config.queue, Buffer.from('5'), { expiration: 2000 }); // ✅ handled

	process.on('SIGINT', () => {
		console.log('Closing AMQP connection...');
		connection.close();
		process.exit(0);
	});
})();
