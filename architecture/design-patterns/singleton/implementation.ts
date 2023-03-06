/**
 * Singleton
 */
class Singleton {
  static instance: Singleton = null;

  private constructor() {}

  public static getInstance(): Singleton {
    if (!this.instance) {
      this.instance = new Singleton();
    }
    return this.instance;
  }
}

const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();
console.log('Are instances equal?', instance1 === instance2);

/**
 * Multiton
 */
class Multiton {
  static instances: Record<string, Multiton> = {};

  private constructor() {}

  public static getInstance(key: string): Multiton {
    if (!this.instances[key]) {
      this.instances[key] = new Multiton();
    }
    return this.instances[key];
  }
}

const multiton1 = Multiton.getInstance('first');
const multiton2 = Multiton.getInstance('second');
const multiton2_2 = Multiton.getInstance('second');

console.log('Are First and Second equal?', multiton1 === multiton2);
console.log('Are Second and Second equal?', multiton2 === multiton2_2);
