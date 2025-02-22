package algorithms.strings;

import static org.junit.Assert.assertEquals;

import org.junit.Test;

public class BoyerMooreTest {
  @Test()
  public void matchAtTheBeginning() {
    assertEquals(0, BoyerMoore.search("NEEDLEELDEEN", "NEEDLE"));
  }

  @Test()
  public void matchAtTheMiddle() {
    assertEquals(3, BoyerMoore.search("ANCNEEDLEDFG", "NEEDLE"));
  }

  @Test()
  public void matchAtTheEnd() {
    assertEquals(6, BoyerMoore.search("ELDEENNEEDLE", "NEEDLE"));
  }

  @Test()
  public void nonMatch() {
    assertEquals(-1, BoyerMoore.search("NEEFDLENEELDLENEAEDLE", "NEEDLE"));
  }

  @Test()
  public void anotherMatch() {
    assertEquals(6, BoyerMoore.search("NEEELENEEDLE", "NEEDLE"));
  }

  @Test()
  public void matchEmptyString() {
    assertEquals(0, BoyerMoore.search("NEEELENEEDLE", ""));
  }

  @Test()
  public void nonMatchEmptyText() {
    assertEquals(-1, BoyerMoore.search("", "NEEDLE"));
  }
}
