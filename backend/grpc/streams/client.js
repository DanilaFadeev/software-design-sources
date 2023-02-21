import grpc from '@grpc/grpc-js';
import { Location, delay, hostname } from './shared.js';

const client = new Location(hostname, grpc.credentials.createInsecure());

// Server streaming PRC
const startServerStreaming = () => {
  const trackStream = client.Track((...args) => console.log(args));

  // handle server events
  trackStream.on('data', point => console.log('Server responded:', point));

  // server responds with a status once all messages are sent
  trackStream.on('status', status => console.log('Server status:', status));

  // stream is ended
  trackStream.on('end', () => console.log('Stream has ended'));
};

// Client streaming PRC
const startClientStreaming = async () => {
  const shareStream = client.Share((error, response) => {
    // handle server response once all the messages were sent
    console.log('Error:', error && error.message);
    console.log('Server responded:', response);
  });

  for (let i = 0; i < 5; i++) {
    const [latitude, longitude] = [Math.random(), Math.random()];
    shareStream.write({ latitude, longitude }); // write to the stream

    await delay(1000);
  }

  shareStream.end(); // complete the stream
};

// Bidirectional streaming RPC
const startBidirectionalStreaming = async () => {
  let tune = 0;
  const tuneStream = client.Tune();

  // handle stream messages from the server
  tuneStream.on('data', options => {
    console.log(`Tune options received from the server:`, options);
    tune = options.tune;
  });

  // handle server status when the streaming is finished
  tuneStream.on('status', status => console.log('Server status:', status));

  for (let i = 0; i < 25; i++) {
    console.log('Send current location to the server...');
    const [latitude, longitude] = [tune + Math.random(), tune + Math.random()];
    tuneStream.write({ latitude, longitude }); // write to the stream

    await delay(1000);
  }

  console.log('Finish the stream');
  tuneStream.end(); // complete the stream
};

/*
 * Uncomment a desired stream mode demonstration down below:
 */

// startServerStreaming();
// startClientStreaming();
// startBidirectionalStreaming();
