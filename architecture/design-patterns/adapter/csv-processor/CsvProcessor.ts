export default class CsvProcessor {

  constructor(private source = '') {}

  public setHeader(items: string[]): void {
    const header = items.join(',');
    const [, ...rows] = this.source.split('\n');

    this.source = `${header}\n${rows.join('\n')}`;
  }

  public addRow(items: string[]): void {
    const row = items.join(',');
    this.source += row + '\n';
  }

  public getSource(): string {
    return this.source;
  }
}
