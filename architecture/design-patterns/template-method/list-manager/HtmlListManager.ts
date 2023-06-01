import { ListManager } from './ListManager';

export class HtmlListManager extends ListManager {

  protected deserialize(input: string): string[] {
    const regexp = /<li>(.*)<\/li>/g;
    const listItems = [...input.matchAll(regexp)].map(([, item]) => item);
    return listItems;
  }
  
  protected serialize(items: string[]): string {
    const htmlList = items.map(item => `\t<li>${item}</li>`).join('\n');
    return htmlList;
  }

  protected beforeContent(): string {
    return '<ul>';
  }

  protected afterContent(): string {
    return '</ul>';
  }

}
