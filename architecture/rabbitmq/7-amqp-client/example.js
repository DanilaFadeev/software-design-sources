import AmqpClient from './AmqpClient.js';

(async () => {
	const client = new AmqpClient({ amqpUrl: 'amqp://localhost:5672' });

	await client.assertExchange('client-pushes', 'topic', { durable: true });

	const { queue } = await client.assertQueue('', { exclusive: true });
	await client.bindQueue(queue, 'client-pushes', '#');

	await client.publish('client-pushes', '#', { hello: true, world: false });

	await client.subscribe(queue, message => {
		console.log(message);
	})
})();