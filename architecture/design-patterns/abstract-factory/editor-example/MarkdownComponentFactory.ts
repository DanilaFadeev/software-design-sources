import type { IText, ITable, TextStyle, IComponentFactory } from './types';

class MarkdownText implements IText {
  protected text: string = '';
  protected style: TextStyle = 'normal';

  setText(text: string): void {
    this.text = text;
  }

  setStyle(style: TextStyle): void {
    this.style = style;
  }

  format(): string {
    if (this.style === 'bold') {
      return `**${this.text}**`;
    }
    return this.text;
  }
}

class MarkdownTable implements ITable {
  protected data: string[][] = [];

  setData(data: string[][]): void {
    this.data = data;
  }

  format(): string {
    return this.data.reduce((acc, row, index) => {
      if (index === 0) {
        let header = `| ${row.join(' | ')} |\n`;
        header += `| ${row.map(() => `---`).join(' | ')} |\n`;

        return acc + header;
      }
      return acc + `| ${row.join(' | ')} |\n`;
    }, '');
  }
}

class MarkdownComponentFactory implements IComponentFactory {
  public createText(): IText {
    return new MarkdownText();
  }

  public createTable(): ITable {
    return new MarkdownTable();
  }
}

export default MarkdownComponentFactory; 
