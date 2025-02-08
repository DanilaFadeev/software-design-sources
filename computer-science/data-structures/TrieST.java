/**
 * The class represents a symbol table of key-value pairs, with string keys and generic values.
 * It supports the usual put, get, and contains methods for symbol table operations.
 * This implementation uses a 256-way trie.
 *
 * @param <T> the type of values associated with the keys
 */
public class TrieST<T> {

  private static int R = 256; // alphabet size

  private static class Node {
    Object value;
    Node[] next = new Node[R];
  }

  public Node root = new Node();

  /**
   * Inserts the key-value pair into the trie.
   * If the key is already in the trie, the associated value is updated.
   */
  public void put(String key, T value) {
    if (key == null) throw new IllegalArgumentException();
    root = put(root, key, value, 0);
  }

  private Node put(Node node, String key, T value, int p) {
    if (node == null) node = new Node();

    if (p < key.length()) {
      int ch = key.charAt(p);
      node.next[ch] = put(node.next[ch], key, value, p + 1);
    } else {
      node.value = value;
    }

    return node;
  }
  
  /**
   * Returns the value associated with the given key.
   */
  public T get(String key) {
    Node node = get(root, key, 0);
    if (node == null) return null;

    return (T) node.value;
  }

  private Node get(Node node, String key, int p) {
    if (node == null) return null;
    if (p == key.length()) return node;

    char ch = key.charAt(p);
    return get(node.next[ch], key, p + 1);
  }

  /**
   * Returns {@code true} if the trie contains the given key.
   */
  public boolean contains(String key) {
    return get(key) != null;
  }

  /**
   * Removes the key and its associated value from the trie.
   */
  public void delete(String key) {
    root = delete(root, key, 0);
  }

  private Node delete(Node node, String key, int p) {
    if (node == null) return null;

    if (p == key.length()) {
      // key is matched, so remove node's value
      node.value = null;
    } else {
      int ch = key.charAt(p);
      node.next[ch] = delete(node.next[ch], key, p + 1);
    }

    // node with a value can't be deleted
    if (node.value != null) return node;

    // node with connections can't be deleted
    for (int i = 0; i < R; i++)
      if (node.next[i] != null)
        return node;

    // delete a node with no value or further connections
    return null;
  }
}
