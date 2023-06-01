import { TextElement, ListElement, ImageElement } from './elements';
import { IVisitor } from './types';

export class HtmlVisitor implements IVisitor {
  constructor(private html: string = '') {}

  public visit(element: TextElement);
  public visit(element: ListElement);
  public visit(element: ImageElement);
  public visit(element: unknown): void {
    if (element instanceof TextElement) {
      const tag = element.getStyle() === 'body' ? 'p' : 'h1';
      this.html += `<${tag}>${element.getText()}</${tag}>\n`;
    }
    if (element instanceof ListElement) {
      const items = element.getList().map(item => `<li>${item}</li>`);
      this.html += `<ul>\n\t${items.join('\n\t')}\n</ul>\n`;
    }
    if (element instanceof ImageElement) {
      const src = element.getSource();
      const size = element.getSize();
      this.html += `<img src="${src}" width="${size}" height="${size}" />\n`;
    }
  }

  public getHtml(): string {
    return this.html;
  }
}