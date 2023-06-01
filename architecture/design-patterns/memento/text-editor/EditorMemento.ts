import type { Style } from './TextEditor';

type EditorMementoState = Array<{
  text: string,
  style: Style
}>;

class EditorMemento {
  constructor(private state: EditorMementoState) {}

  public getState(): EditorMementoState {
    return this.state;
  }
}

export default EditorMemento;
