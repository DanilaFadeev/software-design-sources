import amqplib from 'amqplib';
import os from 'os';

const config = {
	amqp: 'amqp://localhost:5672',
	exchange: 'system-logs'
};

// just a few helper functions to prettify log messages
const round = number => Math.round(number * 100) / 100;

const getNodeHeapUsage = () => {
	const { heapTotal, heapUsed } = process.memoryUsage();
	const usage = round(heapUsed / heapTotal);

	return { usage, severity: usage > 0.6 ? 'warning' : 'info' };
};

const getOsMemoryUsage = () => {
	const usage = round(os.freemem() / os.totalmem());
	return { usage, severity: usage > 0.6 ? 'warning' : 'info' };
};

(async () => {
	const connection = await amqplib.connect(config.amqp);
	const channel = await connection.createChannel();

	// verify/create the topic exchange that will route messages to the bound queues
	await channel.assertExchange(config.exchange, 'topic', { durable: false });

	setInterval(() => {
		const nodeHeapUsage = getNodeHeapUsage();
		const nodeLogMessage = `[node][${nodeHeapUsage.severity}]: heap usage - ${nodeHeapUsage.usage}%`;

		// publish node log message using routing key "node.<severity>"
		channel.publish(config.exchange, `node.${nodeHeapUsage.severity}`, Buffer.from(nodeLogMessage));

		const osMemoryUsage = getOsMemoryUsage();
		const osLogMessage = `[os][${osMemoryUsage.severity}]: memory usage - ${osMemoryUsage.usage}%`;

		// publish os log message using routing key "os.<severity>"
		channel.publish(config.exchange, `os.${osMemoryUsage.severity}`, Buffer.from(osLogMessage));
	}, 1000);
	
	// close the connection once exit signal is received
	process.on('SIGINT', () => {
		console.log('Closing AMQP connection...');
		connection.close();
		process.exit(0);
	});
})();
