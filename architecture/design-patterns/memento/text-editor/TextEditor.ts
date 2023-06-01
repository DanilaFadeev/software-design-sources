import EditorMemento from './EditorMemento';

export enum Style {
  Normal = 'normal',
  Bold = 'bold',
  Heading = 'heading'
}

class Paragraph {

  constructor(
    public text: string = '',
    public style: Style = Style.Normal
  ) {}

  public getContent(): string {
    return `<p style="${this.style}">${this.text}</p>`;
  }
}

class TextEditor {

  private content: Paragraph[] = [];

  public addParagraph(text: string, style?: Style): void {
    const paragraph = new Paragraph(text, style);
    this.content.push(paragraph);
  }

  public modifyParagraph(index: number, text: string): void {
    const paragraph = this.content[index];
    paragraph.text = text;
  }

  public getContent(): string {
    return this.content.map(content => content.getContent()).join('\n');
  }

  public makeSnapshot(): EditorMemento {
    const state = this.content.map(({ text, style }) => ({ text, style }));
    return new EditorMemento(state);
  }

  public restore(memento: EditorMemento): void {
    const state = memento.getState();
    this.content = state.map(({ text, style }) => new Paragraph(text, style));
  }
}

export default TextEditor;
