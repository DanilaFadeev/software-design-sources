export interface IText {
  setText(text: string): void;
  getText(): string;
}

export interface ITextColor {
  colorize(text: string): string;
}
