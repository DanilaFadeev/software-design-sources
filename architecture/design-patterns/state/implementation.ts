interface IState {
  operation(): void;
}

class Context {
  private state: IState;

  constructor() {
    this.state = new ConcreteState1(this);
  }

  public setState(state: IState): void {
    this.state = state;
  }

  public operation(): void {
    this.state.operation();
  }
}

class ConcreteState1 implements IState {
  constructor(private context: Context) {}

  public operation(): void {
    console.log('State #1 is used');
    const nextState = new ConcreteState2(this.context);
    this.context.setState(nextState);
  }
}

class ConcreteState2 implements IState {
  constructor(private context: Context) {}

  public operation(): void {
    console.log('State #2 is used');
    const nextState = new ConcreteState1(this.context);
    this.context.setState(nextState);
  }
}

const context = new Context();
context.operation();
context.operation();
context.operation();
