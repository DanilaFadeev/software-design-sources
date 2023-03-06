interface IPrototype {
  clone(): IPrototype;
}

class ConcretePrototype1 implements IPrototype {
  private _attribute: any = 'default';

  constructor(prototype?: ConcretePrototype1) {
    if (prototype) {
      Object.assign(this, prototype); // copies all fields to 'this'
    }
  }

  public get attribute() {
    return this.attribute;
  }

  public set attribute(value: any) {
    this._attribute = value;
  }

  public clone(): ConcretePrototype1 {
    return new ConcretePrototype1(this);
  }
}

class SubclassPrototype extends ConcretePrototype1 {
  private _subAttribute = 'default';

  constructor(prototype?: SubclassPrototype) {
    super(prototype);
    if (prototype) {
      this._subAttribute = prototype._subAttribute;
    }
  }

  public get subAttribute() {
    return this._subAttribute;
  }

  public set subAttribute(value: any) {
    this._subAttribute = value;
  }

  public clone(): SubclassPrototype {
    return new SubclassPrototype(this);
  }
}

const subclassPrototype = new SubclassPrototype();
subclassPrototype.attribute = 'modified';
subclassPrototype.subAttribute = 'modified';

const copy = subclassPrototype.clone(); // creates identical copy
console.log(copy);
