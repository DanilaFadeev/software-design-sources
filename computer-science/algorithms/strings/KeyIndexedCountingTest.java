package algorithms.strings;

import static org.junit.Assert.assertArrayEquals;

import org.junit.Test;

public class KeyIndexedCountingTest {
  @Test()
  public void sort() {
    char[] characters = new char[] { 'c', 'd', 'b', 'c', 'a', 'b', 'd', 'a' };
    KeyIndexedCounting.sort(characters);
    assertArrayEquals(new char[] { 'a', 'a', 'b', 'b', 'c', 'c', 'd', 'd' }, characters);
  }

  @Test()
  public void sortAlreadySorted() {
    char[] characters = new char[] { 'a', 'd', 'l', 'p', 'z' };
    KeyIndexedCounting.sort(characters);
    assertArrayEquals(new char[] { 'a', 'd', 'l', 'p', 'z' }, characters);
  }

  @Test()
  public void sortReversed() {
    char[] characters = new char[] { 'z', 'y', 'x' };
    KeyIndexedCounting.sort(characters);
    assertArrayEquals(new char[] { 'x', 'y', 'z' }, characters);
  }

  @Test()
  public void sortEmpty() {
    char[] characters = new char[] {};
    KeyIndexedCounting.sort(characters);
    assertArrayEquals(new char[] {}, characters);
  }
}
