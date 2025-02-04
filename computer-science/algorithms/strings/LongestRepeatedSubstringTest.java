package algorithms.strings;

import org.junit.Test;
import static org.junit.Assert.*;

public class LongestRepeatedSubstringTest {

  @Test()
  public void testEmptyString() {
    assertEquals("", LongestRepeatedSubstring.find(""));
  }

  @Test()
  public void testSingleCharacterString() {
    assertEquals("", LongestRepeatedSubstring.find("a"));
  }

  @Test()
  public void testNoRepeatedSubstring() {
    assertEquals("", LongestRepeatedSubstring.find("abcdef"));
  }

  @Test()
  public void testRepeatedSubstring() {
    assertEquals("ana", LongestRepeatedSubstring.find("banana"));
  }

  @Test()
  public void testMultipleRepeatedSubstrings() {
    assertEquals("abcabc", LongestRepeatedSubstring.find("abcabcabc"));
  }

  @Test()
  public void testOverlappingRepeatedSubstrings() {
    assertEquals("aaa", LongestRepeatedSubstring.find("aaaa"));
  }
}
