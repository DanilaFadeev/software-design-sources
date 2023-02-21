import { fileURLToPath } from 'node:url';
import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

// load proto package definitions file
const protoPath = fileURLToPath(new URL('calculator.proto', import.meta.url));
const packageDefinition = protoLoader.loadSync(protoPath);

// get gRPC definition from proto
const calculatorProto = grpc.loadPackageDefinition(packageDefinition);

// initialize the client
const client = new calculatorProto.Calculator('localhost:3000', grpc.credentials.createInsecure());

// send a request with callback handler
client.calculate(
  { operation: 'sum', argument1: 3, argument2: 7 },
  (error, response) => {
    if (error) {
      console.error(`Request error: ${error.message}`);
    } else {
      console.log(`Response:`, response);
    }
  }
);
