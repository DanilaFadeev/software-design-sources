public class StackLinkedList<T> {
  private class Node {
    public T value;
    public Node next;
  }

  private Node head; // pointer to the top element
  private int size = 0; // number of elements in the stack

  // Insert a new element onto the stack
  public void push(T value) {
    Node node = new Node();
    node.value = value;

    node.next = head;
    head = node;

    size++;
  }

  // Retrieve the top element and delete it
  public T pop() {
    if (isEmpty()) return null;

    T value = head.value;
    head = head.next;
    size--;

    return value;
  }

  // Retrieve the top element without deleting it
  public T peek() {
    if (isEmpty()) return null;
    return head.value;
  }

  // Check stack emptiness
  public boolean isEmpty() {
    return (head == null && size == 0);
  }

  // Get the size of the stack
  public int size() {
    return size;
  }
}
