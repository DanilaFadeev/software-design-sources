import org.junit.Test;
import static org.junit.Assert.*;

public class StaticArrayTest {
  private StaticArray<Character> getFilledCharArray() {
    StaticArray<Character> arr = new StaticArray<>(3);
    arr.insert('a');
    arr.insert('b');
    arr.insert('c');

    return arr;
  }

  @Test()
  public void constructionTest() {
    StaticArray<Integer> arr = new StaticArray<>(10);
  }

  @Test()
  public void insertTest() {
    // Arrange
    StaticArray<Integer> arr = new StaticArray<>(5);

    // Act
    for (int i = 0; i < 5; i++) {
      arr.insert((i + 1) * 10);
    }

    // Assert
    assertEquals("[10, 20, 30, 40, 50]", arr.toString());
  }

  @Test()
  public void positionedInsertTest() {
    // Arrange
    StaticArray<Integer> arr = new StaticArray<>(5);

    // Act & Arrange
    arr.insert(3, 0);
    assertEquals("[3]", arr.toString());

    arr.insert(4, 1);
    assertEquals("[3, 4]", arr.toString());

    arr.insert(1, 0);
    assertEquals("[1, 3, 4]", arr.toString());

    arr.insert(2, 1);
    assertEquals("[1, 2, 3, 4]", arr.toString());
  }

  @Test()
  public void removeTest() {
    // Arrange
    StaticArray<Character> arr = getFilledCharArray();

    // Act & Assert
    arr.remove(1);
    assertEquals("[a, c]", arr.toString());
    assertEquals(2, arr.getLength());

    arr.remove(0);
    assertEquals("[c]", arr.toString());
    assertEquals(1, arr.getLength());

    arr.remove(0);
    assertEquals("[]", arr.toString());
    assertEquals(0, arr.getLength());
  }

  @Test()
  public void getTest() {
    // Arrange
    StaticArray<Character> arr = getFilledCharArray();

    // Act & Assert
    assertTrue(arr.get(0) == 'a');
    assertTrue(arr.get(1) == 'b');
    assertTrue(arr.get(2) == 'c');
  }

  @Test()
  public void getIndexTest() {
    // Arrange
    StaticArray<Character> arr = getFilledCharArray();

    // Act & Assert
    assertEquals(0, arr.getIndex('a'));
    assertEquals(1, arr.getIndex('b'));
    assertEquals(2, arr.getIndex('c'));
    assertEquals(-1, arr.getIndex('z'));
  }

  @Test()
  public void existsTest() {
    // Arrange
    StaticArray<Character> arr = getFilledCharArray();

    // Act & Assert
    assertEquals(true, arr.exists('a'));
    assertEquals(true, arr.exists('b'));
    assertEquals(true, arr.exists('c'));
    assertEquals(false, arr.exists('z'));
  }

  @Test()
  public void getLengthTest() {
    // Arrange
    StaticArray<Double> arr = new StaticArray<>(10);

    // Act & Assert
    assertEquals(0, arr.getLength());

    arr.insert(0.213);
    assertEquals(1, arr.getLength());

    arr.insert(0.433);
    assertEquals(2, arr.getLength());

    arr.remove(1);
    assertEquals(1, arr.getLength());
  }
}
