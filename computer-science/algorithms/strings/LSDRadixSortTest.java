package algorithms.strings;

import static org.junit.Assert.assertArrayEquals;

import org.junit.Test;

public class LSDRadixSortTest {
  @Test()
  public void sortEnglishLettersStrings() {
    String[] strings = new String[] { "adb", "aaz", "acb", "zyi", "bdc", "bbb", "acz" };

    LSDRadixSort.sort(strings);

    assertArrayEquals(
      new String[] { "aaz", "acb", "acz", "adb", "bbb", "bdc", "zyi" },
      strings
    ); 
  }

  @Test()
  public void sortDigitsStrings() {
    String[] strings = new String[] { "264", "261", "119", "126", "269", "274", "156" };

    LSDRadixSort.sort(strings);

    assertArrayEquals(
      new String[] { "119", "126", "156", "261", "264", "269", "274" },
      strings
    );
  }

  @Test()
  public void sortEmptyArray() {
    String[] strings = new String[] {};

    LSDRadixSort.sort(strings);

    assertArrayEquals(new String[] {}, strings);
  }

  @Test()
  public void sortReversedOrderStrings() {
    String[] strings = new String[] { "345", "341", "325", "259", "211", "198", "193", "100" };

    LSDRadixSort.sort(strings);

    assertArrayEquals(
      new String[] { "100", "193", "198", "211", "259", "325", "341", "345" },
      strings
    );
  }

  @Test(expected = IllegalArgumentException.class)
  public void throwForDifferentStringLengths() {
    String[] strings = new String[] { "abc", "bds", "jgor" };
    LSDRadixSort.sort(strings);
  }
}
