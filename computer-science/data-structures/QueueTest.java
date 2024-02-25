import org.junit.Test;
import static org.junit.Assert.*;


public class QueueTest {
  @Test()
  public void queueLinkedListTest() {
    QueueLinkedList<Integer> queue = new QueueLinkedList<>();
    assertEquals(true, queue.isEmpty());
    assertEquals(0, queue.size());

    queue.enqueue(10);
    assertEquals(false, queue.isEmpty());
    assertEquals(1, queue.size());

    queue.enqueue(20);
    assertEquals(false, queue.isEmpty());
    assertEquals(2, queue.size());

    queue.enqueue(30);
    assertEquals(false, queue.isEmpty());
    assertEquals(3, queue.size());

    assertEquals((Integer) 10, queue.dequeue());
    assertEquals(false, queue.isEmpty());
    assertEquals(2, queue.size());

    assertEquals((Integer) 20, queue.dequeue());
    assertEquals(false, queue.isEmpty());
    assertEquals(1, queue.size());

    assertEquals((Integer) 30, queue.dequeue());
    assertEquals(true, queue.isEmpty());
    assertEquals(0, queue.size());
  }

  @Test()
  public void queueArrayTest() {
    QueueArray<Integer> queue = new QueueArray<>();
    assertEquals(true, queue.isEmpty());
    assertEquals(0, queue.size());

    queue.enqueue(10);
    assertEquals(false, queue.isEmpty());
    assertEquals(1, queue.size());

    queue.enqueue(20);
    assertEquals(false, queue.isEmpty());
    assertEquals(2, queue.size());

    queue.enqueue(30);
    assertEquals(false, queue.isEmpty());
    assertEquals(3, queue.size());

    assertEquals((Integer) 10, queue.dequeue());
    assertEquals(false, queue.isEmpty());
    assertEquals(2, queue.size());

    assertEquals((Integer) 20, queue.dequeue());
    assertEquals(false, queue.isEmpty());
    assertEquals(1, queue.size());

    assertEquals((Integer) 30, queue.dequeue());
    assertEquals(true, queue.isEmpty());
    assertEquals(0, queue.size());
  }
}
