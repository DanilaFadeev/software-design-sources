import mqtt from 'mqtt';

const config = {
	mqtt: 'mqtt://test.mosquitto.org', // public MQTT broker
	topic: 'software-design/mqtt/example-1'
};

(() => {
	// 1. Connect to the broker specified by the given url and options
	const client = mqtt.connect(config.mqtt);

	// 2. Subscribe to "connect" client event
	client.on('connect', (connack) => {
		console.log('Connected to MQTT Broker');
		console.log(`Connack details: Command - ${connack.cmd}, Length - ${connack.length}, Return Code - ${connack.returnCode}`);

		// 3. Subscribe to topic
		client.subscribe(config.topic, (error, granted) => {
			if (error) {
				console.log(`Failed subscription to the topic "${config.topic}": ${error.message}`);
				process.exit(1);
			}

			console.log(`Subscribed to the topic "${granted[0].topic}"`);

			// 4. Publish a new message to the subscribed topic
			client.publish(config.topic, 'Hello MQTT!');
		});
	});

	// 5. Consume published message
	client.on('message', (topic, payload) => {
		const message = payload.toString(); // convert Buffer payload to string
		console.log(`Received a new message from the topic "${topic}": ${message}`);

		// 6. Unsubscribe from the topic messages
		client.unsubscribe(topic, (error) => {
			if (error) {
				console.log(`Failed to unsubscribe from the topic "${topic}": ${error.message}`);
				process.exit(1);
			}

			console.log(`Unsubscribed for the topic "${topic}"`);

			// 7. Disconnect from MQTT broker
			client.end();
		});
	});

	// subscribe to "reconnect" client event
	client.on('reconnect', () => console.log('Reconnected to MQTT Broker.'));

	// subscribe to "reconnect" client event
	client.on('close', () => { console.log('Connection is closed.') });
})();
