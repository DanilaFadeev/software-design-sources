import type { IText } from './types';

export default class Console {

  private content: IText[] = [];

  public addText(text: IText): void {
    this.content.push(text);
  }

  public reset(): void {
    this.content = [];
  }

  public print(): void {
    for (const text of this.content) {
      console.log(text.getText());
    }
  }

}
