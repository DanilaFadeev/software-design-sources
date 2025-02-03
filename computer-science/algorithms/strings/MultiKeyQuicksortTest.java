package algorithms.strings;

import org.junit.Test;
import static org.junit.Assert.*;

public class MultiKeyQuicksortTest {

  @Test()
  public void testSortEmptyArray() {
    String[] input = {};    
    MultiKeyQuicksort.sort(input);

    assertArrayEquals(new String[] {}, input);
  }

  @Test()
  public void testSortSingleElementArray() {
    String[] input = {"a"};
    MultiKeyQuicksort.sort(input);
    
    assertArrayEquals(new String[] {"a"}, input);
  }

  @Test()
  public void testSortEqualLengthStrings() {
    String[] input = {"bca", "acb", "cab", "abc", "bac", "cba"};
    String[] expected = {"abc", "acb", "bac", "bca", "cab", "cba"};
    
    MultiKeyQuicksort.sort(input);
    
    assertArrayEquals(expected, input);
  }

  @Test()
  public void testSortDifferentLengthStrings() {
    String[] input = {"banana", "apple", "pear", "kiwi", "grape"};
    String[] expected = {"apple", "banana", "grape", "kiwi", "pear"};
    
    MultiKeyQuicksort.sort(input);
    
    assertArrayEquals(expected, input);
  }

  @Test()
  public void testSortAlreadySortedArray() {
    String[] input = {"apple", "banana", "grape", "kiwi", "pear"};
    String[] expected = {"apple", "banana", "grape", "kiwi", "pear"};
    
    MultiKeyQuicksort.sort(input);
    
    assertArrayEquals(expected, input);
  }

  @Test()
  public void testSortReverseSortedArray() {
    String[] input = {"pear", "kiwi", "grape", "banana", "apple"};
    String[] expected = {"apple", "banana", "grape", "kiwi", "pear"};
    
    MultiKeyQuicksort.sort(input);
    
    assertArrayEquals(expected, input);
  }
}
