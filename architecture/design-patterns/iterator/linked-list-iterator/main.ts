import { IterableLinkedList } from './LinkedList';

const linkedList = new IterableLinkedList('Monday');
linkedList.addNode('Tuesday');
linkedList.addNode('Wednesday');
linkedList.addNode('Thursday');
linkedList.addNode('Friday');
linkedList.addNode('Saturday');
linkedList.addNode('Sunday');

const iterator = linkedList.createIterator();
console.log(`There are ${iterator.getTotal()} days in total!`);

while (iterator.hasNext()) {
  const day = iterator.getNext();
  console.log(day);
}
