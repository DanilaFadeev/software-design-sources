import org.junit.Test;
import static org.junit.Assert.*;

public class StackTest {
  @Test()
  public void stackArrayPushTest() {
    StackArray<Integer> stack = new StackArray<>();

    assertEquals(0, stack.size());
    assertEquals(true, stack.isEmpty());

    stack.push(10);
    assertEquals(1, stack.size());
    assertEquals(false, stack.isEmpty());

    stack.push(20);
    assertEquals(2, stack.size());
    assertEquals(false, stack.isEmpty());

    stack.push(30);
    assertEquals(3, stack.size());
    assertEquals(false, stack.isEmpty());

    stack.push(40);
    assertEquals(4, stack.size());
    assertEquals(false, stack.isEmpty());
  }

  @Test()
  public void stackArrayPeekPopTest() {
    // Arrange
    StackArray<Integer> stack = new StackArray<>();
    stack.push(10);
    stack.push(20);
    stack.push(30);
    stack.push(40);

    // Peek the top element without removal
    assertEquals((Integer) 40, stack.peek());
    assertEquals(4, stack.size());

    // Extract stack elements
    assertEquals((Integer) 40, stack.pop());
    assertEquals(3, stack.size());

    assertEquals((Integer) 30, stack.pop());
    assertEquals(2, stack.size());

    assertEquals((Integer) 20, stack.pop());
    assertEquals(1, stack.size());

    assertEquals((Integer) 10, stack.pop());
    assertEquals(0, stack.size());

    // Verify stack emptiness
    assertEquals(true, stack.isEmpty());
    assertEquals(null, stack.peek());
    assertEquals(null, stack.pop());
  }

  @Test()
  public void stackLinkedListPushTest() {
    StackLinkedList<Integer> stack = new StackLinkedList<>();

    assertEquals(0, stack.size());
    assertEquals(true, stack.isEmpty());

    stack.push(10);
    assertEquals(1, stack.size());
    assertEquals(false, stack.isEmpty());

    stack.push(20);
    assertEquals(2, stack.size());
    assertEquals(false, stack.isEmpty());

    stack.push(30);
    assertEquals(3, stack.size());
    assertEquals(false, stack.isEmpty());

    stack.push(40);
    assertEquals(4, stack.size());
    assertEquals(false, stack.isEmpty());
  }

  @Test()
  public void stackLinkedListPeekPopTest() {
    // Arrange
    StackLinkedList<Integer> stack = new StackLinkedList<>();
    stack.push(10);
    stack.push(20);
    stack.push(30);
    stack.push(40);

    // Peek the top element without removal
    assertEquals((Integer) 40, stack.peek());
    assertEquals(4, stack.size());

    // Extract stack elements
    assertEquals((Integer) 40, stack.pop());
    assertEquals(3, stack.size());

    assertEquals((Integer) 30, stack.pop());
    assertEquals(2, stack.size());

    assertEquals((Integer) 20, stack.pop());
    assertEquals(1, stack.size());

    assertEquals((Integer) 10, stack.pop());
    assertEquals(0, stack.size());

    // Verify stack emptiness
    assertEquals(true, stack.isEmpty());
    assertEquals(null, stack.peek());
    assertEquals(null, stack.pop());
  }
}
