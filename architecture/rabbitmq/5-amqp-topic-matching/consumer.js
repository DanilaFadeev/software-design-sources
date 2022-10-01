/*
	Based on the passed binding key, consumer will be listening for the 
	specific events. Some examples:

	node consumer.js #       // handle all the logs
	node consumer.js os.*    // handle the logs from OS
	node consumer.js *.info  // handle the "info" logs from both OS and Node
*/

import amqplib from 'amqplib';

const config = {
	amqp: 'amqp://localhost:5672',
	exchange: 'system-logs'
};

// we can specify the consuming binding key by the command line argument
const bindingKey = process.argv[2] || '#';

(async () => {
	const connection = await amqplib.connect(config.amqp);
	const channel = await connection.createChannel();

	// assert the topic exchange
	await channel.assertExchange(config.exchange, 'topic', { durable: false });

	// assert a queue with an empty name that will be removed automatically
	const { queue } = await channel.assertQueue('', { exclusive: true });

	// bind created queue to the memory-logs topic exchange using specified routing key
	await channel.bindQueue(queue, config.exchange, bindingKey);

	const handler = message => {
		console.log(message.content.toString());
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
