import { IComponentFactory, IComponent, TextStyle } from './types';

export default class Editor {

  protected components: IComponent[] = [];

  constructor(private componentFactory: IComponentFactory) {}

  public addText(text: string, style: TextStyle = 'normal'): void {
    const textElement = this.componentFactory.createText();
    textElement.setText(text);
    textElement.setStyle(style);

    this.components.push(textElement);
  }

  public addTable(data: string[][]): void {
    const tableElement = this.componentFactory.createTable();
    tableElement.setData(data);

    this.components.push(tableElement);
  }

  public process(): string {
    return this.components
      .map(component => component.format())
      .join('\n');
  }

}
