import grpc
import greeter_pb2
import greeter_pb2_grpc
from concurrent import futures

# Servicer implementing the gRPC service methods
class GreeterServicer(greeter_pb2_grpc.GreeterServicer):

  def SayHello(self, request, context):
    message = f"Hello, {request.name}!"
    return greeter_pb2.HelloReply(message=message)

# Server initializer
def serve():
  server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
  server.add_insecure_port('localhost:50051')

  greeter_pb2_grpc.add_GreeterServicer_to_server(GreeterServicer(), server)

  server.start()
  server.wait_for_termination()

if __name__ == '__main__':
  serve()
