import mqtt from 'mqtt';
import { promisify } from 'util';

const config = {
	mqtt: 'mqtt://test.mosquitto.org', // public MQTT broker
	topic: 'software-design/mqtt/example-3'
};

(async () => {
	// initiate a publisher to send retain messages
	const publisher = mqtt.connect(config.mqtt);

	// wait until connection is established
	await new Promise(resolve => publisher.on('connect', resolve));

	// promisify publish method for simplifying sequential calls
	const publish = promisify(publisher.publish.bind(publisher));

	// publish 3 messages with retain flag to keep the latest one in broker's topic
	const options = { retain: true };

	await publish(config.topic, 'First persistent message', options);
	await publish(config.topic, 'Second persistent message', options);
	await publish(config.topic, 'Third persistent message', options);

	// close publisher connection
	publisher.end();

	// initiate a new consumer connection to receive the latest retain message
	const consumer = mqtt.connect(config.mqtt);

	consumer.on('connect', () => {
		consumer.subscribe(config.topic);
	});

	consumer.on('message', (topic, message) => {
		console.log(`There is already a message "${message.toString()}" in topic "${topic}"`);

		// unsubscribe from the topic and close the connection
		consumer.unsubscribe(topic, () => {
			consumer.end();
		})
	});

})();