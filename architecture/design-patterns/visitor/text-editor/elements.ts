import type { IVisitor, IVisitable, TextStyle } from './types';

export class TextElement implements IVisitable {
  constructor(private text: string, private style: TextStyle) {}

  public getText(): string {
    return this.text;
  }

  public getStyle(): TextStyle {
    return this.style;
  }

  public accept(visitor: IVisitor): void {
    visitor.visit(this);
  }
}

export class ListElement {
  constructor(private list: string[]) {}

  public getList(): string[] {
    return this.list;
  }

  public addItem(item: string) {
    this.list.push(item);
  }

  public removeItem(index: number) {
    this.list = this.list.filter((_, idx) => idx !== index);
  }

  public accept(visitor: IVisitor): void {
    visitor.visit(this);
  }
}

export class ImageElement {
  constructor(private src: string, private size: number) {}

  public getSource(): string {
    return this.src;
  }

  public getSize(): number {
    return this.size;
  }

  public accept(visitor: IVisitor): void {
    visitor.visit(this);
  }
}
