import java.util.List;
import java.util.ArrayList;
import java.util.Comparator;

public class Heap<T extends Comparable<T>> {
  private List<T> heap;
  private final Comparator<T> comparator;

  public Heap() {
    this((a, b) -> a.compareTo(b));
  }

  public Heap(Comparator<T> comparator) {
    this.comparator = comparator;

    heap = new ArrayList<>();
    heap.add(null); // first index element is unused
  }

  public Heap(List<T> items) {
    this(items, (a, b) -> a.compareTo(b));
  }

  public Heap(List<T> items, Comparator<T> comparator) {
    this.comparator = comparator;
    heapify(items);
  }

  // Time Complexity: O(1)
  public T peek() {
    return isEmpty() ? null : heap.get(1);
  }

  // Time Complexity: O(log N)
  public void push(T value) {
    heap.add(value); // add value to the end
    percolateUp(heap.size() - 1);
  }

  // Time Complexity: O(log N)
  public T poll() {
    if (heap.size() == 1)
      return null; // Heap is empty
    if (heap.size() == 2)
      return heap.remove(1); // Heap contains 1 element

    // Get first (root) element 
    T result = heap.get(1);

    // Move last value to the root
    heap.set(1, heap.remove(heap.size() - 1));

    // Percolate root value down the heap
    percolateDown(1);
    
    return result;
  }

  public boolean isEmpty() {
    return heap.size() == 1;
  }

  // Time Complexity: O(n)
  private void heapify(List<T> items) {
    heap = new ArrayList<>();
    heap.add(null);  // first index element is unused

    for (T item : items)
      heap.add(item);

    for (int i = heap.size() / 2; i >= 1; i--)
      percolateDown(i);
  }

  private void percolateDown(int index) {
    while (leftChildIdx(index) < heap.size()) {
      int minIndex = leftChildIdx(index);
      int rightChildIdx = rightChildIdx(index);

      if (rightChildIdx < heap.size() && isLess(heap.get(rightChildIdx), heap.get(minIndex)))
        minIndex = rightChildIdx;

      if (isLess(heap.get(index), heap.get(minIndex))) break;

      swap(index, minIndex);
      index = minIndex;
    }
  }

  private void percolateUp(int index) {
    // Swap child and parent node values until
    // the parent is less then the inserted value
    while (index > 1 && isLess(heap.get(index), heap.get(parentIdx(index)))) {
      swap(index, parentIdx(index));
      index = parentIdx(index);
    }
  }

  private int parentIdx(int index) {
    return index / 2;
  }

  private int leftChildIdx(int index) {
    return index * 2;
  }

  private int rightChildIdx(int index) {
    return index * 2 + 1;
  }

  private boolean isLess(T obj1, T obj2) {
    return comparator.compare(obj1, obj2) < 0;
  }

  private void swap(int i, int j) {
    T buff = heap.get(i);
    heap.set(i, heap.get(j));
    heap.set(j, buff);
  }

  @Override
  public String toString() {
    return heap.toString();
  }
}
