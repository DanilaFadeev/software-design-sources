import org.junit.Test;
import static org.junit.Assert.*;

public class TernarySTTest {

  @Test()
  public void testPutAndGet() {
    TernaryST<Integer> tst = new TernaryST<>();
    tst.put("apple", 1);
    tst.put("banana", 2);
    tst.put("grape", 3);

    assertEquals(Integer.valueOf(1), tst.get("apple"));
    assertEquals(Integer.valueOf(2), tst.get("banana"));
    assertEquals(Integer.valueOf(3), tst.get("grape"));
    assertNull(tst.get("orange"));
  }

  @Test()
  public void testContains() {
    TernaryST<Integer> tst = new TernaryST<>();
    tst.put("apple", 1);
    tst.put("banana", 2);

    assertTrue(tst.contains("apple"));
    assertTrue(tst.contains("banana"));
    assertFalse(tst.contains("grape"));
  }

  @Test()
  public void testUpdateValue() {
    TernaryST<Integer> tst = new TernaryST<>();
    tst.put("apple", 1);
    tst.put("apple", 2);

    assertEquals(Integer.valueOf(2), tst.get("apple"));
  }

  @Test()
  public void testEmptyTST() {
    TernaryST<Integer> tst = new TernaryST<>();

    assertNull(tst.get("apple"));
    assertFalse(tst.contains("apple"));
  }

  @Test()
  public void testNullKey() {
    TernaryST<Integer> tst = new TernaryST<>();
    try {
      tst.put(null, 1);
      fail("Expected IllegalArgumentException");
    } catch (IllegalArgumentException e) {}
  }

  @Test()
  public void testEmptyStringKey() {
    TernaryST<Integer> tst = new TernaryST<>();
    try {
      tst.put("", 1);
      fail("Expected IllegalArgumentException");
    } catch (IllegalArgumentException e) {}
  }

  @Test()
  public void testOverlappingKeys() {
    TernaryST<Integer> tst = new TernaryST<>();
    tst.put("app", 1);
    tst.put("apple", 2);

    assertEquals(Integer.valueOf(1), tst.get("app"));
    assertEquals(Integer.valueOf(2), tst.get("apple"));
  }

  @Test()
  public void testDelete() {
    TernaryST<Integer> tst = new TernaryST<>();
    tst.put("apple", 1);
    tst.put("banana", 2);
    tst.put("grape", 3);

    tst.delete("banana");
    assertNull(tst.get("banana"));
    assertTrue(tst.contains("apple"));
    assertTrue(tst.contains("grape"));
    assertFalse(tst.contains("banana"));
  }

  @Test()
  public void testDelete2() {
    TernaryST<Integer> tst = new TernaryST<>();
    tst.put("abc", 1);

    tst.delete("aba");
    assertTrue(tst.contains("abc"));
  }

  @Test()
  public void testDeleteNonExistentKey() {
    TernaryST<Integer> tst = new TernaryST<>();
    tst.put("apple", 1);

    tst.delete("banana");
    assertTrue(tst.contains("apple"));
    assertEquals(Integer.valueOf(1), tst.get("apple"));
  }

  @Test()
  public void testDeletePrefixKey() {
    TernaryST<Integer> tst = new TernaryST<>();
    tst.put("app", 1);
    tst.put("apple", 2);

    tst.delete("app");
    assertFalse(tst.contains("app"));
    assertTrue(tst.contains("apple"));
    assertEquals(Integer.valueOf(2), tst.get("apple"));
  }
}
