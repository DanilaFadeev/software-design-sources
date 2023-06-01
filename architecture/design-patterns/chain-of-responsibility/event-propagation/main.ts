type PageEvent = {
  type: string;
  target: any;
};

interface IEventHandler {
  handle(event: any): void;
}

abstract class BaseEventHandler implements IEventHandler {

  constructor(private parent?: IEventHandler) {}

  public handle(event: PageEvent) {
    if (this.parent) {
      return this.parent.handle(event);
    }

    throw new Error(`Unhandled ${event.type} event!`);
  }
}

class RootDocument extends BaseEventHandler {

  public handle(event: PageEvent): void {
    if (event.target instanceof RootDocument === false) {
      return super.handle(event);
    }
    console.log(`Event ${event.type} is captured by RootDocument!`);
  }

}

class Panel extends BaseEventHandler {

  public handle(event: PageEvent): void {
    if (event.target instanceof Panel === false) {
      return super.handle(event);
    }
    console.log(`Event ${event.type} is captured by Panel!`);
  }

}

class Button extends BaseEventHandler {

  public handle(event: PageEvent): void {
    if (event.target instanceof Button === false) {
      return super.handle(event);
    }
    console.log(`Event ${event.type} is captured by Button!`);
  }

}

const rootDocument = new RootDocument();
const panel = new Panel(rootDocument);
const button = new Button(panel);

const buttonClick: PageEvent = { type: 'click', target: button };
const panelResize: PageEvent = { type: 'resize', target: panel };
const documentScroll: PageEvent = { type: 'scroll', target: rootDocument };
const tabClose: PageEvent = { type: 'close', target: null };

try {
  button.handle(buttonClick);
  button.handle(panelResize);
  button.handle(documentScroll);
  button.handle(tabClose);
} catch (error) {
  console.error('ERROR:', error.message);
}

