package algorithms.strings;

import org.junit.Test;
import static org.junit.Assert.*;


public class MSDRadixSortTest {

  @Test()
  public void sortEqualLengthStrings() {
    String[] input = {"bca", "acb", "cab", "abc", "bac", "cba"};
    String[] expected = {"abc", "acb", "bac", "bca", "cab", "cba"};

    MSDRadixSort.sort(input);
    assertArrayEquals(expected, input);
}

  @Test()
  public void sortEmptyArray() {
    String[] input = {};
    MSDRadixSort.sort(input);
    assertArrayEquals(new String[] {}, input);
  }

  @Test()
  public void sortSingleElementArray() {
    String[] input = { "abc" };
    String[] expected = { "abc" };

    MSDRadixSort.sort(input);
    assertArrayEquals(expected, input);
  }

  @Test()
  public void sortAlreadySortedArray() {
    String[] input = { "abc", "bbd", "csd", "daz" };
    String[] expected = { "abc", "bbd", "csd", "daz" };

    MSDRadixSort.sort(input);
    assertArrayEquals(expected, input);
  }

  @Test()
  public void sortReverseSortedArray() {
    String[] input = { "d", "c", "b", "a" };
    String[] expected = { "a", "b", "c", "d" };

    MSDRadixSort.sort(input);
    assertArrayEquals(expected, input);
  }

  @Test()
  public void sortStringsOfDifferentLengths() {
    String[] input = { "abc", "a", "ab", "abcd" };
    String[] expected = { "a", "ab", "abc", "abcd" };

    MSDRadixSort.sort(input);
    assertArrayEquals(expected, input);
  }
}