import LinkedListIterator from './LinkedListIterator';
import type { DSIterator, DSIterable } from './types';

export class LinkedList<D> {
  private head: LinkedListNode<D>;
  private tail: LinkedListNode<D>;
  private total: number;

  constructor(initialData: D) {
    this.head = this.tail = new LinkedListNode(initialData);
    this.total = 1;
  }

  public addNode(data: D): void {
    const node = new LinkedListNode(data);
    this.tail.setNext(node);
    this.tail = node;
    this.total++;
  }

  public getHead(): LinkedListNode<D> {
    return this.head;
  }

  public getTotal(): number {
    return this.total;
  }
}

export class LinkedListNode<D> {
  constructor(
    private data: D,
    private next?: LinkedListNode<D>
  ) {}

  public setNext(next: LinkedListNode<D>): void {
    this.next = next;
  }

  public getNext(): LinkedListNode<D> {
    return this.next;
  }

  public getData(): D {
    return this.data;
  }
}

export class IterableLinkedList<T> extends LinkedList<T> implements DSIterable<T> {

  public createIterator(): DSIterator<T> {
    return new LinkedListIterator(this);
  }

}
