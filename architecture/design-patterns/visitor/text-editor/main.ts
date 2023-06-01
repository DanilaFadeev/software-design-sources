import { TextElement, ListElement, ImageElement } from './elements';
import { HtmlVisitor } from './HtmlVisitor';
import { MarkdownVisitor } from './MarkdownVisitor';

const articleElements = [
  new TextElement('Article Heading', 'heading'),
  new TextElement('Lorem Ipsum is simply dummy text of the printing and typesetting industry.', 'body'),
  new TextElement('Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.', 'body'),
  new TextElement('It has survived not only five centuries.', 'body'),
  new ListElement(['apple', 'milk', 'bread', 'cucumber']),
  new ImageElement('https://placehold.jp/150x150.png', 150),
  new TextElement('Author: Danila Demidovich', 'body')
];

const htmlVisitor = new HtmlVisitor();
const markdownVisitor = new MarkdownVisitor();

articleElements.forEach(element => {
  element.accept(htmlVisitor);
  element.accept(markdownVisitor);
});

console.log(htmlVisitor.getHtml(), '\n');
/***** Outputs:
<h1>Article Heading</h1>
<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
<p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
<p>It has survived not only five centuries.</p>
<ul>
        <li>apple</li>
        <li>milk</li>
        <li>bread</li>
        <li>cucumber</li>
</ul>
<img src="https://placehold.jp/150x150.png" width="150" height="150" />
<p>Author: Danila Demidovich</p>
*/

console.log(markdownVisitor.getMarkdown());
/***** Outputs:
# Article Heading

Lorem Ipsum is simply dummy text of the printing and typesetting industry.

Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.

It has survived not only five centuries.

- apple
- milk
- bread
- cucumber

![150x150.png](https://placehold.jp/150x150.png)

Author: Danila Demidovich
*/
