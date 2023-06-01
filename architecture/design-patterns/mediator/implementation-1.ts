abstract class Component {
  constructor(private mediator: IMediator) {}

  public emit(): void {
    this.mediator.notify(this);
  }
}

interface IMediator {
  notify(sender: Component);
}

class ConcreteComponent1 extends Component {
  public operationA() {
    console.log('ConcreteComponent1.OperationA()');
  }
}

class ConcreteComponent2 extends Component {
  public operationB() {
    console.log('ConcreteComponent2.OperationB()');
  }
}

class ConcreteMediator implements IMediator {
  private c1: ConcreteComponent1;
  private c2: ConcreteComponent2;

  public setComponent1(component: ConcreteComponent1) {
    this.c1 = component;
  }

  public setComponent2(component: ConcreteComponent2) {
    this.c2 = component;
  }

  notify(sender: Component) {
    if (sender === this.c1) {
      this.c2.operationB();
    }
    if (sender === this.c2) {
      this.c1.operationA();
    }
  }
}

const mediator = new ConcreteMediator();
const component1 = new ConcreteComponent1(mediator);
const component2 = new ConcreteComponent2(mediator);

mediator.setComponent1(component1);
mediator.setComponent2(component2);

component1.emit();
component2.emit();