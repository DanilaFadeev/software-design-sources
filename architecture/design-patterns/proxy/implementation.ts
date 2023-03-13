interface IService {
  operation(): void;
}

class Service implements IService {
  public operation(): void {
    console.log('Origin operation() invocation');
  }
}

class ServiceProxy implements IService {
  constructor(private service: IService) {}

  operation(): void {
    console.log('Before operation() called');
    const result = this.service.operation();
    console.log('After operation() called');

    return result;
  }
}

const service = new Service();
const proxy = new ServiceProxy(service);

proxy.operation();
