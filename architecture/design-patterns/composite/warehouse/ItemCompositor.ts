export interface IWarehouseItem {
  getPrice(): number;
  getWeight(): number;
  getLastArrivalDate(): Date;
};

class ItemCompositor<Item extends IWarehouseItem> implements IWarehouseItem {

  protected items: Item[] = [];

  /**
   * Adds item to the components list
   * @returns void
   */
  public addItems(item: Item | Item[]): void {
    const items = [item].flat() as Item[];
    this.items.push(...items);
  }

  /**
   * Return the list of nested components
   * @returns Array<Item>
   */
  public getItems(): Item[] {
    return this.items;
  }

  /**
   * Calculates the total price of all the child items
   * @returns number
   */
  public getPrice(): number {
    const totalPrice = this.items.reduce(
      (total, item) => total + item.getPrice(),
      0
    );

    return totalPrice;
  }

  /**
   * Calculates the total weight of all the child items
   * @returns number
   */
  public getWeight(): number {
    const totalWeight = this.items.reduce(
      (total, item) => total + item.getWeight(), 0
    );

    return totalWeight;
  }

  /**
   * Calculates the latest arrival date for the child items
   * @returns Date
   */
  public getLastArrivalDate(): Date {
    const dates = this.items.map(item => item.getLastArrivalDate());
    const sortedDates = dates.sort((d1, d2) => d2.getTime() - d1.getTime());

    return sortedDates[0];
  }

}

export default ItemCompositor;
