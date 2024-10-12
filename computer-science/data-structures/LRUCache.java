import java.util.HashMap;
import java.util.Map;

public class LRUCache<K, V> {
  private class Node {
    K key;
    V value;
    Node next;
    Node prev;

    public Node(K key, V value) {
      this.key = key;
      this.value = value;
    }
  }

  private int size = 0;
  private int capacity;
  private Node head;
  private Node tail;
  private Map<K, Node> cache = new HashMap<>();

  public LRUCache(int capacity) {
    this.capacity = capacity;
  }

  public V get(K key) {
    // Check the key for existence
    Node node = cache.get(key);
    if (node == null) return null;

    // Evict the value we found and put it to the front
    detach(node);
    prepend(node);

    return node.value; // Return out the found value
  }

  public void put(K key, V value) {
    Node node = cache.get(key);
    if (node == null) {
      node = new Node(key, value);  // Create a new node
      cache.put(key, node);         // Add to cache map
      size++;                       // Increase cache size
      prepend(node);                // Add to the front
      trimCache();                  // Ensure cache non-overflow
    } else {
      // Update and move it to the front
      node.value = value;
      detach(node);
      prepend(node);
    }
  }

  /*
   * Detaches a node from the doubly-linked list
   */
  private void detach(Node node) {
    if (node.next != null) node.next.prev = node.prev;
    if (node.prev != null) node.prev.next = node.next;

    if (node == head) head = head.next;
    if (node == tail) tail = tail.prev;

    node.next = null;
    node.prev = null;
  }

  /*
   * Inserts a node at the beginning of the doubly-linked list
   */
  private void prepend(Node node) {
    if (head == null) {
      head = tail = node;
      return;
    }

    node.next = head;
    head.prev = node;
    head = node;
  }

  /*
   * Evicts the least recently used element when the cache exceeds its limit
   */
  private void trimCache() {
    if (size <= capacity) return;

    cache.remove(tail.key);
    detach(tail);
    size--;
  }
}
