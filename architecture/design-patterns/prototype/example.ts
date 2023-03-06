interface IPrototype {
  clone(): typeof this;
}

class MacBook implements IPrototype {

  private processor: string;
  private display: string;
  private year: number;
  private ram: number;
  private memory: number;

  constructor(prototype: MacBook)
  constructor(processor: string, display: string, year: number, ram: number, memory: number)
  constructor(processorOrPrototype: string | MacBook, display?: string, year?: number, ram?: number, memory?: number) {
    if (processorOrPrototype instanceof MacBook) {
      Object.assign(this, processorOrPrototype);
      return this;
    }

    this.processor = processorOrPrototype;
    this.display = display;
    this.year = year;
    this.ram = ram;
    this.memory = memory;
  }

  public setProcessor(processor: string): MacBook {
    this.processor = processor;
    return this;
  }

  public setDisplay(display: string): MacBook {
    this.display = display;
    return this;
  }

  public setYear(year: number): MacBook {
    this.year = year;
    return this;
  }

  public setRam(ram: number): MacBook {
    this.ram = ram;
    return this;
  }

  public setMemory(memory: number): MacBook {
    this.memory = memory;
    return this;
  }

  public getConfig(): string {
    const { display, processor, year, ram, memory } = this;
    return `MacBook ${display} ${processor} ${year} ${ram}/${memory}GB`;
  }

  clone(): MacBook {
    return new MacBook(this);
  }
}

const macBookM1Prototype = new MacBook('M1', '13.3"', 2020, 8, 256);
console.log(`Base version: ${macBookM1Prototype.getConfig()}`);

const macBookM1Extended = macBookM1Prototype.clone();
macBookM1Extended.setRam(16).setMemory(512);
console.log(`Extended version: ${macBookM1Extended.getConfig()}`);

const macBookM2Extended = macBookM1Extended.clone();
macBookM2Extended.setProcessor('M2');
console.log(`New extended version: ${macBookM2Extended.getConfig()}`);
