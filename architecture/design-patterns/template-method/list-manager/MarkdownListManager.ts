import { ListManager } from './ListManager';

export class MarkdownListManager extends ListManager {

  protected deserialize(input: string): string[] {
    const listItems = input.trim().split('\n');
    return listItems.map(item => item.replace('- ', ''));
  }

  protected serialize(items: string[]): string {
    const markdownItems = items.map(item => `- ${item}`);
    return markdownItems.join('\n');
  }

  protected beforeContent(): string {
    return '### Markdown List';
  }

}
