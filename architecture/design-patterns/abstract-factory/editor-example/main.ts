import MarkdownComponentFactory from './MarkdownComponentFactory';
import HtmlComponentFactory from './HtmlComponentFactory';
import Editor from './Editor';

const title = 'Article Headline';
const text = 'Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" by Cicero, written in 45 BC.';
const tableData = [
  ['Person', 'Age', 'Position'],
  ['Jhon', '36', 'Tech Support'],
  ['Luke', '29', 'Software Developer'],
  ['Robert', '43', 'System Manager']
]

/**
 * Editor demonstration using Markdown syntax
 */
const markdownComponentFactory = new MarkdownComponentFactory();
const markdownEditor = new Editor(markdownComponentFactory);

markdownEditor.addText(title, 'bold');
markdownEditor.addText(text, 'normal');
markdownEditor.addTable(tableData);

const markdownOutput = markdownEditor.process();
console.log('__________MARKDOWN__________\n', markdownOutput);


/**
 * Editor demonstration using HTML syntax
 */
const htmlComponentFactory = new HtmlComponentFactory();
const htmlEditor = new Editor(htmlComponentFactory);

htmlEditor.addText(title, 'bold');
htmlEditor.addText(text, 'normal');
htmlEditor.addTable(tableData);

const htmlOutput = htmlEditor.process();
console.log('\n__________HTML__________\n', htmlOutput);
