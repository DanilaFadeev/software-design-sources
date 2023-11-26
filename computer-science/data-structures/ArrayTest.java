import org.junit.Test;
import static org.junit.Assert.*;

public class ArrayTest {
  @Test()
  public void constructor() {
    Array<Integer> arr = new Array<>(100);
    assertEquals(0, arr.getSize());
    assertEquals("[]", arr.toString());
  }

  @Test()
  public void exists() {
    // Arrange
    Array<Integer> arr = new Array<>(5);
    arr.insert(11);
    arr.insert(22);
    arr.insert(33);
    arr.insert(44);
    arr.insert(55);

    // Act & Arrange
    assertEquals("Truth for existing element", true, arr.exists(33));
    assertEquals("False for non-existing element", false, arr.exists(12));
    assertEquals("Find the first element", true, arr.exists(11));
    assertEquals("Find the last element", true, arr.exists(55));
  }

  @Test()
  public void delete() {
    // Arrange
    Array<Integer> arr = new Array<>(100);
    arr.insert(11);
    arr.insert(22);
    arr.insert(33);
    arr.insert(44);
    arr.insert(55);

    // Delete non-existing element
    assertEquals(false, arr.delete(15));
    assertEquals(5, arr.getSize());
    assertEquals("[11, 22, 33, 44, 55]", arr.toString());

    // Delete middle element
    assertEquals(true, arr.delete(33));
    assertEquals(4, arr.getSize());
    assertEquals("[11, 22, 44, 55]", arr.toString());

    // Delete first existing element
    assertEquals(true, arr.delete(11));
    assertEquals(3, arr.getSize());
    assertEquals("[22, 44, 55]", arr.toString());

    // Delete last existing element
    assertEquals(true, arr.delete(55));
    assertEquals(2, arr.getSize());
    assertEquals("[22, 44]", arr.toString());
  }

  @Test()
  public void convertToString() {
    Array<Integer> arr = new Array<>(5);
    assertEquals("[]", arr.toString());

    arr.insert(45);
    assertEquals("[45]", arr.toString());

    arr.insert(98);
    assertEquals("[45, 98]", arr.toString());

    arr.insert(999);
    assertEquals("[45, 98, 999]", arr.toString());
  }

  @Test()
  public void getMax() {
    Array<Double> arr = new Array<>(10);
    assertEquals(null, arr.getMax());

    arr.insert(5.0);
    assertEquals((Double) 5.0, arr.getMax());

    arr.insert(1.2);
    assertEquals((Double) 5.0, arr.getMax());

    arr.insert(7.3333);
    assertEquals((Double) 7.3333, arr.getMax());

    arr.insert(-1.0);
    assertEquals((Double) 7.3333, arr.getMax());
  }
}
