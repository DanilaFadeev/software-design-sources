import type { IText, ITextColor } from './types';

class Text implements IText {

  constructor(private text: string, private color: ITextColor) {}

  public setText(text: string): void {
    this.text = text;
  }

  public getText(): string {
    const text = this.color.colorize(this.text);
    return text;
  }

}

export default Text;
