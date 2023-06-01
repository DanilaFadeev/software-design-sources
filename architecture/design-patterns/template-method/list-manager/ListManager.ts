export abstract class ListManager {

  protected abstract deserialize(input: string): string[];

  protected abstract serialize(items: string[]): string;

  protected beforeContent(): string {
    return '';
  }

  protected afterContent(): string {
    return '';
  }

  public addItem(source: string, item: string): string {
    const listItems = this.deserialize(source);
    listItems.push(item);

    const beforeContent = this.beforeContent();
    const serializedList = this.serialize(listItems);
    const afterContent = this.afterContent();

    return `${beforeContent}\n${serializedList}\n${afterContent}`;
  }

  public removeItem(source: string, index: number): string {
    let listItems = this.deserialize(source);
    listItems = listItems.filter((_, idx) => idx !== index);

    const beforeContent = this.beforeContent();
    const serializedList = this.serialize(listItems);
    const afterContent = this.afterContent();

    return `${beforeContent}\n${serializedList}\n${afterContent}`;
  }
}
