import { TextElement, ListElement, ImageElement } from './elements';
import { IVisitor } from './types';

export class MarkdownVisitor implements IVisitor {
  constructor(private markdown: string = '') {}

  public visit(element: TextElement);
  public visit(element: ListElement);
  public visit(element: ImageElement);
  public visit(element: unknown): void {
    if (element instanceof TextElement) {
      const prefix = element.getStyle() === 'body' ? '' : '# ';
      this.markdown += `${prefix}${element.getText()}\n\n`;
    }
    if (element instanceof ListElement) {
      const items = element.getList().map(item => `- ${item}`);
      this.markdown += `${items.join('\n')}\n\n`;
    }
    if (element instanceof ImageElement) {
      const src = element.getSource();
      const imageAlt = src.split('/').slice(-1);
      this.markdown += `![${imageAlt}](${src})\n\n`;
    }
  }

  public getMarkdown(): string {
    return this.markdown;
  }
}