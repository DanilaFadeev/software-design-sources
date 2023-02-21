## Install Dependencies

From the `requirements.txt`:

```bash
pip3 install -r python-server/requirements.txt
```

Or manually:

```bash
pip3 install grpcio grpcio-tools
```

## Generate server code

```bash
python3 -m grpc_tools.protoc --proto_path=.. --python_out=. --pyi_out=. --grpc_python_out=. ../greeter.proto
```
