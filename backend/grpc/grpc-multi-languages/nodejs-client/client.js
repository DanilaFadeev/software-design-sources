import { fileURLToPath } from 'node:url';
import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

const protoPath = fileURLToPath(new URL('../greeter.proto', import.meta.url));
const packageDefinition = protoLoader.loadSync(protoPath);

const greeterProto = grpc.loadPackageDefinition(packageDefinition);
const client = new greeterProto.Greeter('localhost:50051', grpc.credentials.createInsecure());

// send a request with callback handler
client.SayHello(
  { name: 'Jhon Doe' },
  (error, response) => {
    if (error) {
      console.error(`Request error: ${error.message}`);
      return;
    }
    console.log(`Response:`, response);
  }
);
