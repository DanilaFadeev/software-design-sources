import { stdin as input, stdout as output } from 'node:process';
import * as readline from 'node:readline';
import { execSync } from 'node:child_process';

import { AppDocument } from './AppDocument';
import type { ICommand, KeyPressHandler } from './types';


export class Application {
  private document: AppDocument;
  private menuItems: MenuItem[] = [];
  private keyPressHandlers: Record<string, ICommand> = {};

  public async start(): Promise<void> {
    this.attachKeypressListeners();
    this.buildInterface();

    readline
      .createInterface({ input, output })
      .on('line', this.buildInterface.bind(this));
  }

  public close(): void {
    process.exit();
  }

  public addMenuItem(menuItem: MenuItem): void {
    this.menuItems.push(menuItem);
  }

  public addKeyPressHandler(handler: KeyPressHandler) {
    const key = `${handler.ctrl}+${handler.key}`;
    this.keyPressHandlers[key] = handler.command;
  }

  private attachKeypressListeners() {
    readline.emitKeypressEvents(process.stdin);

    if (process.stdin.isTTY)
      process.stdin.setRawMode(true);

    process.stdin.on('keypress', (_, key) => {
      const handlerKey = `${key.ctrl}+${key.name}`;
      if (!this.keyPressHandlers[handlerKey]) return;

      this.keyPressHandlers[handlerKey].execute();
      this.buildInterface();
    });
  }

  private printMenu(): void {
    this.menuItems.forEach((menuItem, index) => {
      console.log(`${index + 1}. ${menuItem.getLabel()}`);
    });
  }

  private buildInterface(input?: string) {
    console.clear();

    const optionIndex = Number.parseInt(input, 10) - 1;
    this.menuItems[optionIndex]?.call();

    console.log(`| Current file:\t${this.document?.getName() || '~no file~'} |`);
    console.log(this.document?.getContent() || '~no content~', '\n\n');

    this.printMenu();

    console.log(`\nSelect an option (1-${this.menuItems.length}): `);
  }

  public createDocument() {
    this.document = new AppDocument();
  }

  public closeDocument() {
    this.document = null;
  }

  public insertFromClipboard(): void {
    const clipboardText = execSync('pbpaste').toString();
    this.document.setContent(clipboardText);
  }
}

export class MenuItem {
  constructor(
    private readonly label: string,
    private readonly command: ICommand
  ) {}

  public getLabel(): string {
    return this.label;
  }

  public call(): void {
    this.command.execute();
  }
}
