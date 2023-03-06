/* Product interfaces */
interface IProductA { // general Product A
  doSomething(): void;
}

interface IProductB { // general Product B
  someAction(): void;
}

/* Concrete products */
class ConcreteProductA1 implements IProductA { // Product A, Variant 1
  doSomething(): void {
    console.log('Use Concrete Product A - Variation 1');
  }
}

class ConcreteProductA2 implements IProductA { // Product A, Variant 2
  doSomething(): void {
    console.log('Use Concrete Product A - Variation 2');
  }
}

class ConcreteProductB1 implements IProductB { // Product B, Variant 1
  someAction(): void {
    console.log('Use Concrete Product B - Variation 1');
  }
}

class ConcreteProductB2 implements IProductB { // Product B, Variant 2
  someAction(): void {
    console.log('Use Concrete Product B - Variation 2');
  }
}

// Abstract Factory producing variants of ProductA and ProductB
interface IAbstractFactory {
  createProductA(): IProductA;
  createProductB(): IProductB;
}

// Factory implementation, producing Variant 1
class ConcreteFactory1 implements IAbstractFactory {
  public createProductA(): IProductA {
    return new ConcreteProductA1();
  }

  public createProductB(): IProductB {
    return new ConcreteProductB1();
  }
}

// Factory implementation, producing Variant 2
class ConcreteFactory2 implements IAbstractFactory {
  public createProductA(): IProductA {
    return new ConcreteProductA2();
  }

  public createProductB(): IProductB {
    return new ConcreteProductB2();
  }
}

class Client {
  constructor(private factory: IAbstractFactory) {}

  getProducts(): [IProductA, IProductB] {
    return [
      this.factory.createProductA(),
      this.factory.createProductB()
    ];
  }
}

// using Products from Factory1 (First variant)
const factory1 = new ConcreteFactory1();
const client1 = new Client(factory1);

const [pa1, pb1] = client1.getProducts();

pa1.doSomething();
pb1.someAction();

// using Products from Factory2 (Second variant)
const factory2 = new ConcreteFactory2();
const client2 = new Client(factory2);

const [pa2, pb2] = client2.getProducts();

pa1.doSomething();
pb2.someAction();
