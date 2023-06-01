import TextEditor, { Style } from './TextEditor';
import EditorHistory from './EditorHistory';

const editor = new TextEditor();
const editorHistory = new EditorHistory(editor);

editor.addParagraph('I will add later', Style.Heading);
editorHistory.save();

editor.addParagraph('Lorem Ipsum is simply dummy text of the printing and typesetting industry.');
editorHistory.save();

editor.modifyParagraph(0, 'What is Lorem Ipsum?');

console.log('Initial content state:');
console.log(editor.getContent(), '\n\n');

editorHistory.undo();
editorHistory.undo();

console.log('After double "undo" called:');
console.log(editor.getContent());
