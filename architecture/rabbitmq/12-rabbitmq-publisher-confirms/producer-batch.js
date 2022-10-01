import amqplib from 'amqplib';
import { promisify } from 'util';

const config = {
	amqp: 'amqp://localhost:5672',
	queue: 'publish-confirms-batch',
	batchSize: 50000
};

(async () => {
	const connection = await amqplib.connect(config.amqp);

	// open a channel which uses “confirmation mode” (a RabbitMQ extension)
	const channel = await connection.createConfirmChannel();

	await channel.assertQueue(config.queue, { durable: false });

	// remove all the messages from the queue
	channel.purgeQueue(config.queue);

	// publish batch of messages
	for (let i = 1; i <= config.batchSize; i++) {
		channel.sendToQueue(config.queue, Buffer.from(`Message #${i}`));
	}
	console.log(`A batch of ${config.batchSize} was published`);

	// wait until all the publishes are confirmed
	await channel.waitForConfirms();

	console.log(`All the messages were delivered to a broker`);

	connection.close();
})();
