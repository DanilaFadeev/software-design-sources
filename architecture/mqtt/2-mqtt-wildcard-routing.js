import mqtt from 'mqtt';

const config = {
	mqtt: 'mqtt://test.mosquitto.org', // public MQTT broker
	topic: 'software-design/mqtt/example-2'
};

// make short topic alias for logs
const alias = topic => topic.replace(`${config.topic}/`, '');

// Setup a new subscriber client that will be receiving messages
// and print them into a console
const setupSubscriber = async (clientName, topicToSubscribe) => {
	// connect to the broker specified by the given url and options
	const client = mqtt.connect(config.mqtt);

	// consume published messages
	client.on('message', (topic, payload) => {
		const message = payload.toString(); // convert Buffer payload to string
		console.log(`[${clientName}]: "${alias(topicToSubscribe)}" <- "${alias(topic)}". Message: "${message}"`);
	});

	return new Promise((resolve, reject) => {
		client.on('connect', () => {
			// subscribe to topic
			client.subscribe(topicToSubscribe, error => {
				if (error) {
					console.log(`[${clientName}]: Failed subscription to the topic "${alias(topicAlias)}" - ${error.message}`);
					reject(error);
				}
				console.log(`[${clientName}]: Subscribed to the topic "${alias(topicToSubscribe)}"`);
				resolve(client);
			});
		});		
	});
};

(async () => {
	// Listen "temperature" sensors from home's living room
	const consumer1 = await setupSubscriber('Client1', `${config.topic}/home/livingroom/temperature`);

	// Listen "temperature" sensors for any room at home
	const consumer2 = await setupSubscriber('Client2', `${config.topic}/home/+/temperature`);

	// Listen all the sensors from any room at home
	const consumer3 = await setupSubscriber('Client3', `${config.topic}/home/#`);

	const publisher = mqtt.connect(config.mqtt);

	publisher.on('connect', () => {
		publisher.publish(`${config.topic}/home/livingroom/temperature`, 'Update for C1, C2, C3');
		publisher.publish(`${config.topic}/home/livingroom/brightness`, 'Update for C3');
		publisher.publish(`${config.topic}/home/bathroom/temperature`, 'Update for C2, C3');
		publisher.publish(`${config.topic}/home`, 'Update for C3');
		publisher.publish(`${config.topic}/work/meetingroom/temperature`, 'Must be ignored');
		publisher.publish(`${config.topic}/work/meetingroom`, 'Must be ignored');
	});

})();
