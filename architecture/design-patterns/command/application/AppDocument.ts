export class AppDocument {
  constructor(
    private name: string = 'Untitled.txt',
    private content: string = 'Empty Document'
  ) {}

  public getName(): string {
    return this.name;
  }

  public getContent(): string {
    return this.content;
  }

  public setContent(content: string): void {
    this.content = content;
  }
}
