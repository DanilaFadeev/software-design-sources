public class SinglyLinkedList<E> {
  private class Node {
    public E data;
    public Node next;
  }

  private Node head = null;

  private Node tail = null;

  public void add(E value) {
    Node node = new Node();
    node.data = value;

    if (isEmpty()) {
      head = node;
      tail = node;
    } else {
      tail.next = node;
      tail = node;
    }
  }

  public void addFirst(E value) {
    Node node = new Node();
    node.data = value;

    node.next = head;
    head = node;
  }

  public void remove(int index) {
    Node node = head;

    if (index == 0) {
      head = head.next;
      return;
    }

    for (int i = 0; i < index - 1; i++)
      node = node.next;

    if (node.next == tail) {
      tail = node;
    }
    if (node.next != null) {
      node.next = node.next.next;
    }
  }

  public E get(int index) {
    Node node = head;

    for (int i = 0; i < index; i++)
      node = node.next;

    return node.data;
  }


  public boolean isEmpty() {
    return head == null;
  }

  public String toString() {
    String output = "";
    Node node = head;

    while (node != null) {
      output += node.data;
      if (node.next != null) output += " -> ";
      node = node.next;
    }

    return output;
  }

}
