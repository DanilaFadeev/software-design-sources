export type TextStyle = 'normal' | 'bold';

export interface IComponent {
  format(): string;
}

/**
 * Generic components common for different syntaxes
 */
export interface IText extends IComponent {
  setText(text: string): void;
  setStyle(style: TextStyle): void;
}

export interface ITable extends IComponent {
  setData(data: string[][]): void;
}

/**
 * Component factory creating syntax-specific components
 */
export interface IComponentFactory {
  createText(): IText;
  createTable(): ITable;
}
