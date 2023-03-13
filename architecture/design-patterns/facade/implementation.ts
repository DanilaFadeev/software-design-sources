class SubSystemA {
  public operationA(): void {
    console.log('SubSystemA - operationA()');
  } 
}

class SubSystemB {
  public operationB(): void {
    console.log('SubSystemB - operationB()');
  } 
}

class SubSystemC {
  public operationC(): void {
    console.log('SubSystemC - operationC()');
  } 
}

class Facade {
  private subSystemA = new SubSystemA();
  private subSystemB = new SubSystemB();
  private subSystemC = new SubSystemC();

  public facadeOperation(): void {
    this.subSystemA.operationA();
    this.subSystemB.operationB();
    this.subSystemC.operationC();
  }
}

const facade = new Facade();
facade.facadeOperation();
