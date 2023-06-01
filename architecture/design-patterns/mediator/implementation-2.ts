interface Mediator {
  notify(sender: any): void;
}

class ComponentA {
  constructor(private mediator: Mediator) {}

  public operationA(): void {
    console.log('ComponentA.operationA()');
  }

  public notify(): void {
    this.mediator.notify(this);
  }
}

class ComponentB {
  constructor(private mediator: Mediator) {}

  public operationB(): void {
    console.log('ComponentB.operationB()');
  }

  public notify(): void {
    this.mediator.notify(this);
  }
}

class ConcreteMediator implements Mediator {
  private componentA: ComponentA;
  private componentB: ComponentB;

  public setComponentA(componentA: ComponentA) {
    this.componentA = componentA;
  }

  public setComponentB(componentB: ComponentB) {
    this.componentB = componentB;
  }

  public notify(sender: any): void {
    if (sender instanceof ComponentA) {
      this.componentB.operationB();
    }
    if (sender instanceof ComponentB) {
      this.componentA.operationA();
    }
  }
}

const mediator = new ConcreteMediator();
const componentA = new ComponentA(mediator);
const componentB = new ComponentB(mediator);

mediator.setComponentA(componentA);
mediator.setComponentB(componentB);

componentA.notify(); // Output: ComponentB.operationB()
componentB.notify(); // Output: ComponentA.operationA()
