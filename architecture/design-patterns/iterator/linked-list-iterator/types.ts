export interface DSIterator<T> {
  getNext(): T;
  getCurrent(): T;
  getTotal(): number;
  hasNext(): boolean;
}

export interface DSIterable<T> {
  createIterator(): DSIterator<T>;
}
