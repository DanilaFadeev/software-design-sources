import org.junit.Test;
import static org.junit.Assert.*;

public class BinarySearchTest {
  @Test()
  public void findEven() {
    Integer[] arr = { 10, 20, 30, 40, 50, 60, 70, 80, 90, 100 };

    assertEquals(0, BinarySearch.find(arr, 10));
    assertEquals(1, BinarySearch.find(arr, 20));
    assertEquals(2, BinarySearch.find(arr, 30));
    assertEquals(3, BinarySearch.find(arr, 40));
    assertEquals(4, BinarySearch.find(arr, 50));
    assertEquals(5, BinarySearch.find(arr, 60));
    assertEquals(6, BinarySearch.find(arr, 70));
    assertEquals(7, BinarySearch.find(arr, 80));
    assertEquals(8, BinarySearch.find(arr, 90));
    assertEquals(9, BinarySearch.find(arr, 100));

    assertEquals(-1, BinarySearch.find(arr, -10));
    assertEquals(-1, BinarySearch.find(arr, 0));
    assertEquals(-1, BinarySearch.find(arr, 25));
    assertEquals(-1, BinarySearch.find(arr, 75));
    assertEquals(-1, BinarySearch.find(arr, 200));
  }

  @Test()
  public void findOdd() {
    Integer[] arr = { 1, 2, 3, 4, 5, 6, 7, 8, 9 };

    assertEquals(0, BinarySearch.find(arr, 1));
    assertEquals(1, BinarySearch.find(arr, 2));
    assertEquals(2, BinarySearch.find(arr, 3));
    assertEquals(3, BinarySearch.find(arr, 4));
    assertEquals(4, BinarySearch.find(arr, 5));
    assertEquals(5, BinarySearch.find(arr, 6));
    assertEquals(6, BinarySearch.find(arr, 7));
    assertEquals(7, BinarySearch.find(arr, 8));
    assertEquals(8, BinarySearch.find(arr, 9));

    assertEquals(-1, BinarySearch.find(arr, -5));
    assertEquals(-1, BinarySearch.find(arr, 0));
    assertEquals(-1, BinarySearch.find(arr, 15));
  }
}
