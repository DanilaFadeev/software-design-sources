package algorithms;

import org.junit.Test;
import static org.junit.Assert.*;

public class FibonacciTest {
  private int[] fibonacciNums = { 0, 1, 1, 2, 3, 5, 8, 13, 21, 34 };

  @Test()
  public void fibonacciTest() {
    for (int i = 0; i < fibonacciNums.length; i++) {
      assertEquals(fibonacciNums[i], Fibonacci.fibonacci(i));
    }
  }
}
