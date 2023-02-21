import { fileURLToPath } from 'node:url';
import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

// load proto package definitions file
const protoPath = fileURLToPath(new URL('calculator.proto', import.meta.url));
const packageDefinition = protoLoader.loadSync(protoPath);

// get gRPC definition from proto
const calculatorProto = grpc.loadPackageDefinition(packageDefinition);
const calculatorService = calculatorProto.Calculator.service;

const server = new grpc.Server();

const calculate = (call, callback) => {
  const { request, metadata, cancelled } = call;
  console.log('Received data:', { request, cancelled, metadata });

  if (request.operation === 'sum') {
    const { argument1, argument2 } = request;
    return callback(null, { result: argument1 + argument2 });
  }

  callback(new Error('Operation is not implemented'));
}

// add service with its implementation to the server 
server.addService(calculatorService, { calculate });

// specify server host and port 
server.bindAsync('localhost:3000', grpc.ServerCredentials.createInsecure(), () => {
  // start the server
  server.start();
});
