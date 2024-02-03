import org.junit.Test;
import static org.junit.Assert.*;

public class DynamicArrayTest {
  @Test()
  public void pushTest() {
    DynamicArray<Integer> da = new DynamicArray<>(2);

    assertEquals(da.getCapacity(), 2);

    da.push(1);
    assertEquals(da.getCapacity(), 2);

    da.push(2);
    assertEquals(da.getCapacity(), 4);

    da.push(3);
    assertEquals(da.getCapacity(), 4);

    da.push(4);
    assertEquals(da.getCapacity(), 8);
  }

  @Test()
  public void popTest() {
    DynamicArray<Integer> da = new DynamicArray<>(8);
    da.push(1);
    da.push(2);
    da.push(3);

    assertEquals(da.getCapacity(), 8);

    da.pop();
    assertEquals(da.getCapacity(), 4);

    da.pop();
    assertEquals(da.getCapacity(), 2);

    da.pop();
    assertEquals(da.getCapacity(), 1);
  }
}
