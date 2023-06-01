interface IVisitor {
  visit(element: ConcreteElementA): void;
  visit(element: ConcreteElementB): void;
}

interface IElement {
  accept(visitor: IVisitor): void;
}

class ConcreteElementA implements IElement {
  constructor(public propA: any) {}

  public accept(visitor: IVisitor): void {
    visitor.visit(this);
  }
}

class ConcreteElementB implements IElement {
  constructor(public propB: any) {}

  public accept(visitor: IVisitor): void {
    visitor.visit(this);
  }
}

class ConcreteVisitor implements IVisitor {
  visit(element: ConcreteElementA): void;
  visit(element: ConcreteElementB): void;
  visit(element: ConcreteElementA | ConcreteElementB): void {
    if (element instanceof ConcreteElementA) {
      console.log(`Visit ConcreteElementA.propA: ${element.propA}`);
    }
    if (element instanceof ConcreteElementB) {
      console.log(`Visit ConcreteElementB.propB: ${element.propB}`);
    }
  }
}

const elements = [new ConcreteElementA('Sun'), new ConcreteElementB('Moon')];
const visitor = new ConcreteVisitor();

for (const element of elements) {
  element.accept(visitor);
}

/** 
 * Output:
 *  Visit ConcreteElementA.propA: Sun
 *  Visit ConcreteElementB.propB: Moon
 */