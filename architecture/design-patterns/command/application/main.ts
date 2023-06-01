import { Application, MenuItem } from './Application';
import {
  CreateDocumentCommand,
  PasteCommand,
  CloseApplicationCommand
} from './commands';

const documentEditor = new Application();

// Initialize available editor actions
const createDocumentCommand = new CreateDocumentCommand(documentEditor);
const pasteCommand = new PasteCommand(documentEditor);
const closeApplicationCommand = new CloseApplicationCommand(documentEditor);

// Add menu items to the application with an appropriate actions
documentEditor.addMenuItem(new MenuItem("Create Document (Ctrl+N)", createDocumentCommand));
documentEditor.addMenuItem(new MenuItem("Paste (Ctrl+V)", pasteCommand));
documentEditor.addMenuItem(new MenuItem("Exit (Ctrl+V)", closeApplicationCommand));

// Assign handler for key combinations
documentEditor.addKeyPressHandler({ ctrl: true, key: 'n', command: createDocumentCommand });
documentEditor.addKeyPressHandler({ ctrl: true, key: 'v', command: pasteCommand });
documentEditor.addKeyPressHandler({ ctrl: true, key: 'q', command: closeApplicationCommand });

documentEditor.start();
