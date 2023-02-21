import grpc from '@grpc/grpc-js';
import messages from './greeter_pb.cjs';
import * as services from './greeter_grpc_pb.cjs';

const server = new grpc.Server();

server.addService(services.GreeterService, {
  sayHello: (call, callback) => {
    const reply = new messages.HelloReply();
    reply.setMessage(`Hello, ${call.request.getName()}!`);

    callback(null, reply);
  }
});

server.bindAsync('localhost:3000', grpc.ServerCredentials.createInsecure(), (_error, port) => {
  server.start();
  console.log(`gRPC server is running on port ${port}`);
});
