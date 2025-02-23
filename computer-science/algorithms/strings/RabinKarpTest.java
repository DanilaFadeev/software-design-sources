package algorithms.strings;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;

import org.junit.Test;

public class RabinKarpTest {
  @Test()
  public void testMatchInShortString() {
    String text = "abc";
    String pattern = "b";
    int result = RabinKarp.search(text, pattern);
    assertEquals(1, result);
  }

  @Test()
  public void testMatchAtBeginning() {
    String text = "HELLO WORLD";
    String pattern = "HELLO";
    int result = RabinKarp.search(text, pattern);
    assertEquals(0, result);
  }

  @Test()
  public void testMatchAtEnd() {
    String text = "HELLO WORLD";
    String pattern = "WORLD";
    int result = RabinKarp.search(text, pattern);
    assertEquals(6, result);
  }

  @Test()
  public void testNoMatch() {
    String text = "HELLO WORLD";
    String pattern = "GOODBYE";
    int result = RabinKarp.search(text, pattern);
    assertEquals(-1, result);
  }

  @Test()
  public void testMatchInMiddle() {
    String text = "THE QUICK BROWN FOX";
    String pattern = "QUICK";
    int result = RabinKarp.search(text, pattern);
    assertEquals(4, result);
  }

  @Test()
  public void testMultipleMatches() {
    String text = "AABAACAADAABAABA";
    String pattern = "AABA";
    int result = RabinKarp.search(text, pattern);
    assertEquals(0, result); // Only the first match is returned
  }

  @Test()
  public void testMatchInLargeString() {
    String text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
                + "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
                + "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris "
                + "nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in "
                + "reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. "
                + "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia "
                + "deserunt mollit anim id est laborum.";
    String pattern = "ullamco";
    int result = RabinKarp.search(text, pattern);
    assertEquals(text.indexOf(pattern), result);
  }

  @Test()
  public void calculatePatternHash() {
    // Arrange
    StringBuilder sb = new StringBuilder();
    sb.append((char) 2);
    sb.append((char) 6);
    sb.append((char) 5);
    sb.append((char) 3);
    sb.append((char) 5);
    String pattern = sb.toString();

    // Act & Assert
    assertEquals(1542, RabinKarp.hash(pattern, pattern.length()));
  }

  @Test()
  public void testHashConsistency() {
    String pattern1 = "pattern";
    String pattern2 = "pattern";
    assertEquals(RabinKarp.hash(pattern1, pattern1.length()), RabinKarp.hash(pattern2, pattern2.length()));
  }

  @Test()
  public void testHashDifferentPatterns() {
    String pattern1 = "pattern1";
    String pattern2 = "pattern2";
    assertNotEquals(RabinKarp.hash(pattern1, pattern1.length()), RabinKarp.hash(pattern2, pattern2.length()));
  }
}
