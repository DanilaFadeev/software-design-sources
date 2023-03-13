type IntrinsicState = {
  color: string;
};

type ExtrinsicState = {
  coordinates: [number, number];
};

interface IFlyweight {
  operation(state: ExtrinsicState): void;
}

class Flyweight implements IFlyweight {
  constructor(private intrinsicState: IntrinsicState) { // stores "shared" state
    console.log(`Flyweight object created with ${JSON.stringify(intrinsicState)}`);
  }

  public operation(state: ExtrinsicState): void { // applies "external" state
    const [x, y] = state.coordinates;
    console.log(`Draw ${this.intrinsicState.color} point at (${x},${y})`);
  }
}

class FlyweightFactory {
  private static cache: Map<string, IFlyweight> = new Map();

  public static getFlyweight(state: IntrinsicState): IFlyweight {
    const key = this.getObjectHash(state);
    if (!this.cache.has(key)) {
      const flyweight = new Flyweight(state);
      this.cache.set(key, flyweight);
    }

    return this.cache.get(key);
  }

  private static getObjectHash(obj): string {
    return Object.entries(obj).map(([k, v]) => `${k}:${v}`).join('|');
  }
}

class Context {
  private flyweight: IFlyweight;
  private extrinsicState: ExtrinsicState;

  constructor(intrinsicState: IntrinsicState, extrinsicState: ExtrinsicState) {
    this.flyweight = FlyweightFactory.getFlyweight(intrinsicState);
    this.extrinsicState = extrinsicState;
  }

  public operation(): void {
    this.flyweight.operation(this.extrinsicState);
  }
}

const redPoint1 = new Context({ color: 'red' }, { coordinates: [1, 1] });
redPoint1.operation();

const redPoint2 = new Context({ color: 'red' }, { coordinates: [5, 3] });
redPoint2.operation();

const redPoint3 = new Context({ color: 'red' }, { coordinates: [6, 1] });
redPoint3.operation();
