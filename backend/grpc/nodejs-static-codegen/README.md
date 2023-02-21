### Install dependencies

```bash
npm install --save @grpc/grpc-js grpc-tools google-protobuf
```

### Generate proto stubs:

```
npx grpc_tools_node_protoc --js_out=import_style=commonjs,binary:. --grpc_out=grpc_js:. greeter.proto
```

### Run

```
node server.js
node client.js YourName
```
