interface Strategy {
  execute(): void;
}

class Context {
  constructor(private strategy: Strategy) {}

  public setStrategy(strategy: Strategy): void {
    this.strategy = strategy;
  }

  public operation(): void {
    this.strategy.execute();
  }
}

class ConcreteStrategy1 implements Strategy {
  public execute(): void {
    console.log(`Process request using Strategy #1`);
  }
}

class ConcreteStrategy2 implements Strategy {
  public execute(): void {
    console.log(`Process request using Strategy #2`);
  }
}

const strategy1 = new ConcreteStrategy1();
const strategy2 = new ConcreteStrategy2();

const context = new Context(strategy1);
context.operation(); // Process request using Strategy #1

context.setStrategy(strategy2);
context.operation(); // Process request using Strategy #2
