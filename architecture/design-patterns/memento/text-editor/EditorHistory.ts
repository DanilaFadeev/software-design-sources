import type TextEditor from './TextEditor';
import type EditorMemento from './EditorMemento';

export default class EditorHistory {

  private history: EditorMemento[] = [];

  constructor(private editor: TextEditor) {}

  public save(): void {
    const memento = this.editor.makeSnapshot();
    this.history.push(memento);
  }

  public undo(): void {
    const memento = this.history.pop();
    this.editor.restore(memento);
  }
}
