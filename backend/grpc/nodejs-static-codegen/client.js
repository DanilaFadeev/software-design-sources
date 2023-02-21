import grpc from '@grpc/grpc-js';
import messages from './greeter_pb.cjs';
import * as services from './greeter_grpc_pb.cjs';

const client = new services.GreeterClient('localhost:3000', grpc.credentials.createInsecure());

const request = new messages.HelloRequest();
request.setName(process.argv[2] || 'Jhon Doe');

client.sayHello(request, (_error, helloReply) => {
  console.log('Received message:', helloReply.getMessage());
});


