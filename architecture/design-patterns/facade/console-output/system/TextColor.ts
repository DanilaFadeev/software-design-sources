import { ITextColor } from './types';

export enum Color {
  Black = 30,
  Red = 31,
  Green = 32,
  Yellow = 33,
  Blue = 34
};

class TextColor implements ITextColor {

  constructor(private color: Color) {}

  public colorize(text: string): string {
    return `\x1B[${this.color}m${text}\x1B[0m`
  }

}

export default TextColor;
