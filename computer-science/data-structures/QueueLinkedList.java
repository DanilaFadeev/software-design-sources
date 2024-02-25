import java.util.LinkedList;
import java.util.NoSuchElementException;

public class QueueLinkedList<T> {
  private class Node {
    public T value;
    public Node next;
  }

  private Node head;    // "end" of the queue
  private Node tail;    // "start" of the queue
  private int size = 0; // queue size

  // Add an element to the start of the queue
  public void enqueue(T value) {
    Node node = new Node();
    node.value = value;

    if (isEmpty()) {
      head = node;
    } else {
      tail.next = node;
    }

    tail = node;
    size++;
  }

  // Take and remove the element at the end of the queue
  public T dequeue() {
    if (isEmpty()) {
      throw new NoSuchElementException("Queue is empty");
    }

    T value = head.value;

    if (tail == head) tail = head.next;
    head = head.next;
    size--;

    return value;
  }

  public T peek() {
    if (isEmpty()) {
      throw new NoSuchElementException("Queue is empty");
    }
    return head.value;
  }

  public boolean isEmpty() {
    return (
      head == null &&
      tail == null &&
      size == 0
    );
  }

  public int size() {
    return size;
  }

  public static void main(String[] args) {
    LinkedList<String> queue = new LinkedList<>();
    
    queue.add("First");
    queue.add("Second");
    queue.add("Third");

    queue.peek();       // "First"
    queue.poll();       // "First"
    queue.size();       // 2
    queue.isEmpty();    // false
  }
}
