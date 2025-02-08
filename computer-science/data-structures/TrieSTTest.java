import org.junit.Test;
import static org.junit.Assert.*;

public class TrieSTTest {

  @Test()
  public void testPutAndGet() {
    TrieST<Integer> trie = new TrieST<>();
    trie.put("apple", 1);
    trie.put("banana", 2);
    trie.put("grape", 3);

    assertEquals(Integer.valueOf(1), trie.get("apple"));
    assertEquals(Integer.valueOf(2), trie.get("banana"));
    assertEquals(Integer.valueOf(3), trie.get("grape"));
    assertNull(trie.get("orange"));
  }

  @Test()
  public void testContains() {
    TrieST<Integer> trie = new TrieST<>();
    trie.put("apple", 1);
    trie.put("banana", 2);

    assertTrue(trie.contains("apple"));
    assertTrue(trie.contains("banana"));
    assertFalse(trie.contains("grape"));
  }

  @Test()
  public void testUpdateValue() {
    TrieST<Integer> trie = new TrieST<>();
    trie.put("apple", 1);
    trie.put("apple", 2);

    assertEquals(Integer.valueOf(2), trie.get("apple"));
  }

  @Test()
  public void testEmptyTrie() {
    TrieST<Integer> trie = new TrieST<>();

    assertNull(trie.get("apple"));
    assertFalse(trie.contains("apple"));
  }

  @Test()
  public void testNullKey() {
    TrieST<Integer> trie = new TrieST<>();
    try {
      trie.put(null, 1);
      fail("Expected IllegalArgumentException");
    } catch (IllegalArgumentException e) {
        // Expected exception
    }
  }

  @Test()
  public void testEmptyStringKey() {
    TrieST<Integer> trie = new TrieST<>();
    trie.put("", 1);

    assertTrue(trie.contains(""));
    assertEquals(Integer.valueOf(1), trie.get(""));
  }

  @Test()
  public void testOverlappingKeys() {
    TrieST<Integer> trie = new TrieST<>();
    trie.put("app", 1);
    trie.put("apple", 2);

    assertEquals(Integer.valueOf(1), trie.get("app"));
    assertEquals(Integer.valueOf(2), trie.get("apple"));
  }

  @Test()
  public void testDelete() {
    TrieST<Integer> trie = new TrieST<>();
    trie.put("apple", 1);
    trie.put("banana", 2);
    trie.put("grape", 3);

    trie.delete("banana");
    assertNull(trie.get("banana"));
    assertTrue(trie.contains("apple"));
    assertTrue(trie.contains("grape"));
    assertFalse(trie.contains("banana"));
  }

  @Test()
  public void testDeleteNonExistentKey() {
    TrieST<Integer> trie = new TrieST<>();
    trie.put("apple", 1);

    trie.delete("banana");
    assertTrue(trie.contains("apple"));
    assertEquals(Integer.valueOf(1), trie.get("apple"));
  }

  @Test()
  public void testDeletePrefixKey() {
    TrieST<Integer> trie = new TrieST<>();
    trie.put("app", 1);
    trie.put("apple", 2);

    trie.delete("app");
    assertFalse(trie.contains("app"));
    assertTrue(trie.contains("apple"));
    assertEquals(Integer.valueOf(2), trie.get("apple"));
  }
}
