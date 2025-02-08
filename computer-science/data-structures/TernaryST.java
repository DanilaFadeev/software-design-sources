/**
 * The class represents a symbol table of key-value pairs, with string keys and generic values.
 * It supports the usual put, get, and contains methods for symbol table operations.
 * This implementation uses a ternary search trie, where each node has three children: 
 * smaller (left), equal (middle), and larger (right).
 */
public class TernaryST<T> {
  private class Node {
    char ch;
    T value;
    Node left, mid, right;
    Node(char ch) { this.ch = ch; }
  }

  private Node root;

  /**
   * Inserts the key-value pair into the ternary search trie.
   * If the key is already in the trie, the associated value is updated.
   */
  public void put(String key, T value) {
    if (key == null || key.length() == 0)
      throw new IllegalArgumentException();

    root = put(root, key, value, 0);
  }

  private Node put(Node node, String key, T value, int p) {
    char ch = key.charAt(p);
    if (node == null) node = new Node(ch);

    // the last symbol of the search key
    if (p == key.length() - 1) {
      node.value = value;
      return node;
    }

    // move down the tree
    if      (ch > node.ch)  node.right = put(node.right, key, value, p);
    else if (ch < node.ch)  node.left  = put(node.left,  key, value, p);
    else if (ch == node.ch) node.mid   = put(node.mid,   key, value, p + 1);

    return node;
  }

  /**
   * Returns the value associated with the given key.
   */
  public T get(String key) {
    Node node = get(root, key, 0);
    if (node == null) return null;

    return node.value;
  }

  private Node get(Node node, String key, int p) {
    if (node == null) return null;
    if (p == key.length() - 1) return node;

    char ch = key.charAt(p);
    if (ch < node.ch) return get(node.left, key, p);
    if (ch > node.ch) return get(node.right, key, p);
    return get(node.mid, key, p + 1);
  }

  /**
   * Returns {@code true} if the trie contains the given key.
   */
  public boolean contains(String key) {
    return get(key) != null;
  }

  /**
   * Removes the key and its associated value from the trie.
   * If the key is not in the trie, the trie is unchanged.
   */
  public void delete(String key) {
    root = delete(root, key, 0);
  }

  private Node delete(Node node, String key, int p) {
    if (node == null) return null;
  
    int ch = key.charAt(p);

    if (ch < node.ch)              node.left =  delete(node.left, key, p);
    else if (ch > node.ch)         node.right = delete(node.right, key, p);
    else if (p < key.length() - 1) node.mid =   delete(node.mid, key, p + 1);
    else                           node.value = null;

    // delete a node with no value or further connections
    if (node.value == null && node.left == null && node.mid == null && node.right == null)
      return null;

    return node;
  }
}
