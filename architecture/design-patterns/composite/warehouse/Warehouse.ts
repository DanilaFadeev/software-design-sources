import ItemCompositor, { IWarehouseItem } from './ItemCompositor';

class Space extends ItemCompositor<Shelf> {
  constructor(private address: string) {
    super();
  }

  public toString(): string {
    return `Space (${this.address})`;
  }
}

class Shelf extends ItemCompositor<Bin> {
  constructor(private stand: number) {
    super();
  }

  public toString(): string {
    return `Shelf ${this.stand}`;
  }
}

class Bin extends ItemCompositor<Item> {
  constructor(private code: string) {
    super();
  }

  public toString(): string {
    return `Bin ${this.code}`;
  }
}

class Item implements IWarehouseItem {

  constructor(
    private barcode: string,
    private price: number,
    private weight: number,
    private arrival: Date
  ) {}

  public getPrice(): number {
    return this.price;
  }

  public getWeight(): number {
    return this.weight;
  }

  public getLastArrivalDate(): Date {
    return this.arrival;
  }

  public toString(): string {
    return `Item ${this.barcode}`;
  }

}

export { Space, Shelf, Bin, Item };
