interface IHandler {
  setNext(handler: IHandler): void;
  handle(request: any): void;
}

abstract class BaseHandler implements IHandler {
  private next: IHandler;

  public setNext(handler: IHandler): void {
    this.next = handler;
  }

  public handle(request: any): void {
    this.next?.handle(request);
  }
}

class ConcreteHandler1 extends BaseHandler {
  public handle(request: any): void {
    request.concreteHandler1 = true;
    super.handle(request);
  }
}

class ConcreteHandler2 extends BaseHandler {
  public handle(request: any): void {
    request.concreteHandler2 = true;
    super.handle(request);
  }
}

// Configure the chain of handlers
const handler1 = new ConcreteHandler1();
const handler2 = new ConcreteHandler2();
handler1.setNext(handler2);

// Pass the request though the chain
const request = {};
handler1.handle(request);
console.log(request); // { concreteHandler1: true, concreteHandler2: true }
