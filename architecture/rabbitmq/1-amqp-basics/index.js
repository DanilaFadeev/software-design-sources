import amqplib from 'amqplib';

const config = {
	amqp: 'amqp://localhost:5672',
	queue: 'example'
};

const startProducer = async () => {
	let connection;
	try {
		connection = await amqplib.connect(config.amqp);
	} catch (error) {
		console.error(`AMQP connection failed: ${error.message}`);
		process.exit(1);
	}

	const channel = await connection.createChannel();

	// create queue if it doesn't exist already
	await channel.assertQueue(config.queue, { durable: false });

	const res = channel.sendToQueue(config.queue, Buffer.from('Sample message'));

	console.log('Message is sent!');
};

const startConsumer = async () => {
	let connection;
	try {
		connection = await amqplib.connect(config.amqp);
	} catch (error) {
		console.error(`AMQP connection failed: ${error.message}`);
		process.exit(1);
	}

	const channel = await connection.createChannel();

	// create queue if it doesn't exist already
	await channel.assertQueue(config.queue, { durable: false });

	channel.consume(
		config.queue,
		message => { console.log(`Message received: ${message.content.toString()}`); },
		{ noAck: true }
	);
}

(async () => {
	// start producer that will publish a message
	await startProducer();

	// start consumer in 3 seconds that will receive a message 
	setTimeout(startConsumer, 3000);
})();
