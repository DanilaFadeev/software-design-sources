import { HtmlListManager } from './HtmlListManager';
import { MarkdownListManager } from './MarkdownListManager';

const htmlList = `
  <ul>
    <li>Coffee</li>
    <li>Tea</li>
    <li>Milk</li>
  </ul>
`;

const markdownList = `
- Coffee
- Tea
- Milk
`;

const htmlListManager = new HtmlListManager();

console.log('\nAdd item to the HTML list:');
console.log(htmlListManager.addItem(htmlList, 'Bread'));
/*
  <ul>
    <li>Coffee</li>
    <li>Tea</li>
    <li>Milk</li>
    <li>Bread</li>
  </ul>
*/

console.log('\nRemove item from HTML list:');
console.log(htmlListManager.removeItem(htmlList, 1));
/*
  <ul>
    <li>Coffee</li>
    <li>Milk</li>
  </ul>
*/

const markdownListManager = new MarkdownListManager();

console.log('\nAdd item to the Markdown list:');
console.log(markdownListManager.addItem(markdownList, 'Bread'));
/*
  ### Markdown List
  - Coffee
  - Tea
  - Milk
  - Bread
*/

console.log('\nRemove item from Markdown list:');
console.log(markdownListManager.removeItem(markdownList, 1));
/*
  ### Markdown List
  - Coffee
  - Milk
*/
