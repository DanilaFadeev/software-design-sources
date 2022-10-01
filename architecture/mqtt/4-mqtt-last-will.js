import mqtt from 'mqtt';

const config = {
	mqtt: 'mqtt://test.mosquitto.org', // public MQTT broker
	topic: 'software-design/mqtt/example-4'
};

(async () => {
	// initiate a consumer connection
	const consumer = mqtt.connect(config.mqtt);

	// wait until consumer connection is established
	await new Promise(resolve => consumer.once('connect', resolve));

	consumer.subscribe(`${config.topic}/#`);

	consumer.on('message', (topic, message) => {
		console.log(`[${topic}] ${message.toString()}`);
	})

	// initiate a consumer connection
	const publisher = mqtt.connect(config.mqtt, {
		will: {
			topic: `${config.topic}/dead`,
			payload: 'Device is disconnected!'
		}
	});

	// wait until producer connection is established
	await new Promise(resolve => publisher.once('connect', resolve));

	// publish some dummy message
	publisher.publish(config.topic, 'Hello world');

	setTimeout(() => {
		// emulate device disconnection by force connection closing
		publisher.end(true);
		console.log('Publisher connection is forced to close');
	}, 1000)
})();
