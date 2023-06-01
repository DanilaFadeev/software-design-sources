interface IIterator<Item> {
  getNext(): Item;
  hasNext(): boolean;
}

interface IIterable<Item> {
  createIterator(): IIterator<Item>;
}

class ConcreteCollection implements IIterable<string> {
  constructor(public items: string[]) {}

  createIterator(): IIterator<string> {
    return new ConcreteIterator(this);
  }
}

class ConcreteIterator implements IIterator<string> {
  private currentPosition = 0;

  constructor(private collection: ConcreteCollection) {}

  public getNext(): string {
    const currentItem = this.collection.items[this.currentPosition];
    this.currentPosition++;

    return currentItem;
  }

  public hasNext(): boolean {
    return this.currentPosition < this.collection.items.length;
  }
}

const collection = new ConcreteCollection(['first', 'second', 'third']);
const iterator = collection.createIterator();

while (iterator.hasNext()) {
  console.log(iterator.getNext());
}
