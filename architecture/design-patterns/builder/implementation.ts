class ConcreteProductA {
  constructor(
    public param1 = 0,
    public param2 = false,
    public param3 = ''
  ) {}
}

class ConcreteProductB {
  constructor(
    public option1 = 1,
    public option2 = ''
  ) {}
}

interface IBuilder {
  buildStepA(): void;
  buildStepB(): void;
  buildStepC(): void;
}

class ConcreteBuilder1 implements IBuilder {
  private result = new ConcreteProductA();

  public buildStepA(): void {
    this.result.param1 = 1;
  }

  public buildStepB(): void {
    this.result.param2 = true;
  }

  public buildStepC(): void {
    this.result.param3 = 'Built with Concrete Builder 1';
  }

  public getResult(): ConcreteProductA {
    return this.result;
  }
}

class ConcreteBuilder2 implements IBuilder {
  private result = new ConcreteProductB();

  public buildStepA(): void {
    this.result.option1 = 2;
  }

  public buildStepB(): void {
    this.result.option2 = 'Built with Concrete Builder 2';
  }

  public buildStepC(): void {} // just ignore this step :)

  public getResult(): ConcreteProductB {
    return this.result;
  }
}

class Director {
  private builder: IBuilder | null = null;

  public setBuilder(builder: IBuilder) {
    this.builder = builder;
  }

  public buildProduct() {
    this.builder?.buildStepA();
    this.builder?.buildStepB();
    this.builder?.buildStepC();
  }
}

const director = new Director();

// build ProductA using ConcreteBuilder1
const concreteBuilder1 = new ConcreteBuilder1();
director.setBuilder(concreteBuilder1);
director.buildProduct();

console.log(concreteBuilder1.getResult());

// build ProductB using ConcreteBuilder2
const concreteBuilder2 = new ConcreteBuilder2();
director.setBuilder(concreteBuilder2);
director.buildProduct();

console.log(concreteBuilder2.getResult());
