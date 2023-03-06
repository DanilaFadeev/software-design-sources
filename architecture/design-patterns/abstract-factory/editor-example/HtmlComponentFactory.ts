import type { IText, ITable, TextStyle, IComponentFactory } from './types';

class HtmlText implements IText {
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
      return `<b>${this.text}</b></br>`;
    }
    return this.text;
  }
}

class HtmlTable implements ITable {
  protected data: string[][] = [];

  setData(data: string[][]): void {
    this.data = data;
  }

  format(): string {
    const [headRow, ...bodyRows] = this.data;
    const headRowHtml = headRow.map(cell => `<th>${cell}</th>`).join('');
    const bodyRowsHtml = bodyRows
      .map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`)
      .join('');

    return `<table><thead><tr>${headRowHtml}</tr></thead><tbody>${bodyRowsHtml}</tbody></table><br/>`;
  }
}

class HtmlComponentFactory implements IComponentFactory {
  public createText(): IText {
    return new HtmlText();
  }

  public createTable(): ITable {
    return new HtmlTable();
  }
}

export default HtmlComponentFactory;
