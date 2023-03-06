class ConcreteProduct {
  constructor() {
    console.log('Concrete Product is initialized');
  }
}

class ObjectPool {
  private instances: ConcreteProduct[] = [];

  public acquire(): ConcreteProduct {
    if (this.instances.length > 0) {
      // removes the first array item and returns it
      return this.instances.pop();
    }

    // initializing the new instance
    return new ConcreteProduct();
  }

  public release(concreteProduct: ConcreteProduct): void {
    this.instances.push(concreteProduct);
  }
}

const objectPool = new ObjectPool();
const concreteProduct1 = objectPool.acquire();
const concreteProduct2 = objectPool.acquire();
console.log('Are products the same?', concreteProduct1 === concreteProduct2);

objectPool.release(concreteProduct1);
const concreteProduct3 = objectPool.acquire();
console.log('Are products the same?', concreteProduct1 === concreteProduct3);
