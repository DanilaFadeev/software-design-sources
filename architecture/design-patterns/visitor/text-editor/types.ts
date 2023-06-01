import type { TextElement, ListElement, ImageElement } from './elements';

export interface IVisitable {
  accept(visitor: IVisitor): void;
}

export interface IVisitor {
  visit(element: TextElement): string;
  visit(element: ListElement): string;
  visit(element: ImageElement): string;
}

export type TextStyle = 'body' | 'heading';
