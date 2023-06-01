import { Application } from './Application';
import type { ICommand } from './types';

abstract class ApplicationCommand implements ICommand {
  constructor(protected application: Application) {}
  abstract execute(): void;
}

export class CreateDocumentCommand extends ApplicationCommand {
  execute(): void {
    this.application.createDocument();
  }
}

export class PasteCommand extends ApplicationCommand {
  execute(): void {
    this.application.insertFromClipboard();
  }
}

export class CloseApplicationCommand extends ApplicationCommand {
  execute(): void {
    this.application.close();
  }
}
