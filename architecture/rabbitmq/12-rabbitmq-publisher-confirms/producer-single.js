import amqplib from 'amqplib';
import { promisify } from 'util';

const config = {
	amqp: 'amqp://localhost:5672',
	queue: 'publish-confirms-single'
};

(async () => {
	const connection = await amqplib.connect(config.amqp);

	// open a channel which uses “confirmation mode” (a RabbitMQ extension)
	const channel = await connection.createConfirmChannel();

	// Promisify "sendToQueue" method as it applies a callback function
	// as the last argument that is called when a message is published 
	const sendToQueue = promisify(channel.sendToQueue.bind(channel));

	await channel.assertQueue(config.queue, { durable: false });

	try {
		await sendToQueue(config.queue, Buffer.from('My message'), {});
		console.log('Message is published successfully');
	} catch (error) {
		console.error(`Failed to publish message: ${error.message}`);
	}

	process.on('SIGINT', () => {
		console.log('Closing AMQP connection...');
		connection.close();
		process.exit(0);
	});
})();
