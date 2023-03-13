interface Implementation {
  method1(): void;
  method2(): void;
}

class ConcreteImplementation1 implements Implementation {
  public method1(): void {
    console.log('Method1 from Implementation1 is called');
  }

  public method2(): void {
    console.log('Method2 from Implementation1 is called');
  }
}

class ConcreteImplementation2 implements Implementation {
  public method1(): void {
    console.log('Method1 from Implementation2 is called');
  }

  public method2(): void {
    console.log('Method2 from Implementation2 is called');
  }
}

class Abstraction {
  constructor(private implementation: Implementation) {}

  public feature(): void {
    this.implementation.method1();
    this.implementation.method2();
  }
}

const implementation = new ConcreteImplementation2();
const abstraction = new Abstraction(implementation);
abstraction.feature();
