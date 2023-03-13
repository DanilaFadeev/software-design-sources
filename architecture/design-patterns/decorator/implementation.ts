interface IComponent {
  operation(): void;
}

class ConcreteComponent implements IComponent {
  public operation(): void {
    console.log('Component\'s operation() called');
  }
}

abstract class Decorator implements IComponent {
  constructor(private component: IComponent) {}

  public operation(): void {
    console.log('Decorator\'s operation() called');
    return this.component.operation();
  }
}

class ConcreteDecorator extends Decorator {
  // override parent class method with additional logic
  public operation(): void {
    console.log('ConcreteDecorator\'s operation() called');
    return super.operation();
  }
}

const component = new ConcreteComponent();
const decoratedComponent = new ConcreteDecorator(component);
const doubleDecoratedComponent = new ConcreteDecorator(decoratedComponent);

doubleDecoratedComponent.operation();

/** Result:
 * ConcreteDecorator's operation() called
 * BaseDecorator's operation() called
 * ConcreteDecorator's operation() called
 * BaseDecorator's operation() called
 * Component's operation() called
 */
