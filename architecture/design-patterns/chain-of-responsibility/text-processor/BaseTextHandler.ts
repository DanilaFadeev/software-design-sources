export type TextRequest = string;

export interface IHandler {
  setNext(handler: IHandler): void;
  handle(request: TextRequest): TextRequest;
}

abstract class BaseTextHandler implements IHandler {

  private next: IHandler;

  public setNext(handler: IHandler): void {
    this.next = handler;
  }

  public handle(request: TextRequest): TextRequest {
    return this.next ? this.next.handle(request) : request;
  }

}

export default BaseTextHandler;
