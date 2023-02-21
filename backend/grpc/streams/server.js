import grpc from '@grpc/grpc-js';
import { Location, delay, hostname } from './shared.js';

class LocationService {
  // server-streaming rpc
  async Track(stream) {
    // start streaming data every second
    for (let i = 0; i < 5; i++) {
      stream.write({ latitude: Math.random(), longitude: Math.random() });
      await delay(1000);
    }

    // complete the streaming
    stream.end();
  }

  // client-streaming rpc
  async Share(stream, callback) {
    stream.on('data', ({ latitude, longitude }) => {
      console.log(`Client's location: @${latitude.toFixed(5)},${longitude.toFixed(5)}`);
    });

    stream.on('end', () => {
      console.log('Client stream has ended');
      callback();
    });
  }

  // bidirectional streaming rpc
  async Tune(stream) {
    const interval = setInterval(() => {
      const tune = Math.floor(Math.random() * 12);

      console.log(`Lets tune with ${tune}!`);
      stream.write({ tune });
    }, 3500);

    stream.on('data', ({ latitude, longitude }) => {
      console.log(`Client's location: @${latitude.toFixed(5)},${longitude.toFixed(5)}`);
    });

    stream.on('end', () => {
      console.log('Stream is finished by the client');
      clearInterval(interval);
      stream.end();
    });
  }

}

const server = new grpc.Server();

server.addService(Location.service, new LocationService());

server.bindAsync(hostname, grpc.ServerCredentials.createInsecure(), (_error, port) => {
  server.start();
  console.log(`Server is running on port ${port}`);
});
