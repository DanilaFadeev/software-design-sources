/* Implementation: */

interface IProduct {
  doSomething(): void;
}

class ConcreteProductA implements IProduct {
  public doSomething(): void {
    console.log('Use Concrete Product A');
  }
}

class ConcreteProductB implements IProduct {
  public doSomething(): void {
    console.log('Use Concrete Product B');
  }
}

abstract class Creator {
  protected abstract createProduct(): IProduct;

  public useProduct(): void {
    const product = this.createProduct();
    product.doSomething();
  }
}

class ConcreteCreatorA extends Creator {
  protected createProduct(): IProduct {
    return new ConcreteProductA();
  }
}

class ConcreteCreatorB extends Creator {
  protected createProduct(): IProduct {
    return new ConcreteProductB();
  }
}

/* Usage: */

const concreteCreatorA = new ConcreteCreatorA();
concreteCreatorA.useProduct(); // Result: Use Concrete Product A

const concreteCreatorB = new ConcreteCreatorB();
concreteCreatorB.useProduct(); // Result: Use Concrete Product B
