import { LinkedList, LinkedListNode } from './LinkedList';
import type { DSIterator } from './types';

class LinkedListIterator<T> implements DSIterator<T> {

  private currentNode: LinkedListNode<T>;

  constructor(private linkedList: LinkedList<T>) {
    this.currentNode = linkedList.getHead();
  }

  public getNext(): T {
    const data = this.currentNode.getData();
    this.currentNode = this.currentNode.getNext();

    return data;
  }

  public getCurrent(): T {
    return this.currentNode.getData();
  }

  public getTotal(): number {
    return this.linkedList.getTotal();
  }

  public hasNext(): boolean {
    return !!this.currentNode.getNext();
  }

}

export default LinkedListIterator;
