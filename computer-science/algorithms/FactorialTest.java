import org.junit.Test;
import static org.junit.Assert.*;

public class FactorialTest {
  @Test()
  public void factorialTest1() {
    assertEquals(1, Factorial.factorial(1));
  }

  @Test()
  public void factorialTest2() {
    long expected = 5 * 4 * 3 * 2 * 1;
    assertEquals(expected, Factorial.factorial(5));
  }

  @Test()
  public void factorialTest3() {
    long expected = 10 * 9 * 8 * 7 * 6 * 5 * 4 * 3 * 2 * 1;
    assertEquals(expected, Factorial.factorial(10));
  }

  @Test()
  public void factorialInvalidTest() {
    assertEquals(1, Factorial.factorial(-999));
  }
}
