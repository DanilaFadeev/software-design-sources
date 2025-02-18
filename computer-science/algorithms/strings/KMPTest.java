package algorithms.strings;

import static org.junit.Assert.assertEquals;

import org.junit.Test;

public class KMPTest {
  String small1 = "abc";
  String small2 = "123";
  String small3 = "ABC";
  String small4 = "!@#";

  String medium1 = "The quick brown fox jumps over the lazy dog";
  String medium2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  String medium3 = "0123456789!@#$%^&*()_+-=[]{}|;':,.<>/?`~";

  String large1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
              + "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
              + "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris "
              + "nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in "
              + "reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. "
              + "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia "
              + "deserunt mollit anim id est laborum.";

  @Test()
  public void testMatchInShortString() {
    assertEquals(small1.indexOf("b"), KMP.search(small1, "b"));
    assertEquals(small2.indexOf("3"), KMP.search(small2, "3"));
    assertEquals(small3.indexOf("A"), KMP.search(small3, "A"));
    assertEquals(small4.indexOf("#"), KMP.search(small4, "#"));
  }

  @Test()
  public void testMatchInMediumString() {
    assertEquals(medium1.indexOf("lazy"), KMP.search(medium1, "lazy"));
    assertEquals(medium2.indexOf("YZab"), KMP.search(medium2, "YZab"));
    assertEquals(medium3.indexOf("':,"), KMP.search(medium3, "':,"));
  }

  @Test()
  public void testMatchInLargeString() {
    assertEquals(large1.indexOf("in"), KMP.search(large1, "in"));
    assertEquals(large1.indexOf("Duis aute"), KMP.search(large1, "Duis aute"));
    assertEquals(large1.indexOf("id est"), KMP.search(large1, "id est"));
  }

  @Test()
  public void testMissMatchInShortString() {
    assertEquals(-1, KMP.search(small1, "d"));
    assertEquals(-1, KMP.search(small2, "9"));
    assertEquals(-1, KMP.search(small3, "Y"));
    assertEquals(-1, KMP.search(small4, "^"));
  }

  @Test()
  public void testMissMatchInMediumString() {
    assertEquals(-1, KMP.search(medium1, "LAZY"));
    assertEquals(-1, KMP.search(medium2, "ji"));
    assertEquals(-1, KMP.search(medium3, "(^^)"));
  }

  @Test()
  public void testMissMatchInLargeString() {
    assertEquals(-1, KMP.search(large1, "you"));
    assertEquals(-1, KMP.search(large1, "will not"));
    assertEquals(-1, KMP.search(large1, "find it"));
  }
}
