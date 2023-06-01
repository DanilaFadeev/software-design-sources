abstract class AbstractClass {
  public templateMethod(): void {
    this.step1();
    if (this.step2()) {
      this.step3();
    }
  }

  protected abstract step1(): void;

  protected step2(): boolean {
    return true;
  }

  protected step3(): void {
    console.log('AbstractClass: Execute step #1');
  }
}

class ConcreteClass1 extends AbstractClass {
  protected step1(): void {
    console.log('ConcreteClass1: Execute step #1');
  }

  protected step2(): boolean {
    return false;
  }
}

class ConcreteClass2 extends AbstractClass {
  protected step1(): void {
    console.log('ConcreteClass2: Execute step #1');
  }

  protected step3(): void {
    console.log('ConcreteClass2: Execute step #3');
  }
}

const concreteClass1 = new ConcreteClass1();
concreteClass1.templateMethod();
// ConcreteClass1: Execute step #1

const concreteClass2 = new ConcreteClass2();
concreteClass2.templateMethod();
// ConcreteClass2: Execute step #1
// ConcreteClass2: Execute step #3
