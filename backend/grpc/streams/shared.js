import { fileURLToPath } from 'node:url';
import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

const protoPath = fileURLToPath(new URL('location.proto', import.meta.url));
const packageDefinition = protoLoader.loadSync(protoPath);

const grpcObject = grpc.loadPackageDefinition(packageDefinition);

// gRPC service definition
export const Location = grpcObject.Location;

// Asynchronous delay in milliseconds
export const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));

// gRPC server host and port
export const hostname = 'localhost:3000';
