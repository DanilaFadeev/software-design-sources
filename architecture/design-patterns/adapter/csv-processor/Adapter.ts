import CsvProcessor from './CsvProcessor';

type CsvItem = Record<string, string>;

export default class Adapter {

  private csvProcessor: CsvProcessor;

  constructor(source: string = '') {
    this.csvProcessor = new CsvProcessor(source);
  }

  // set CSV data from JSON array
  public setData(items: CsvItem[]): void {
    // set object keys as column headers
    const headItems = Object.keys(items[0]);
    this.csvProcessor.setHeader(headItems);

    // fill table with items data
    items.forEach(item => {
      const values = Object.values(item);
      this.csvProcessor.addRow(values);
    });
  }

  // convert source CSV string to JSON array
  public getSource(): CsvItem[] {
    const rawSource = this.csvProcessor.getSource();
    const [header, ...rows] = rawSource.split('\n').slice(0, -1);

    const keys = header.split(',');
    const items = rows.reduce((acc, row) => {
      const values = row.split(',');
      const entires = keys.map((key, index) => [key, values[index]]);

      return [...acc, Object.fromEntries(entires)];
    }, []);

    return items;
  }
}
