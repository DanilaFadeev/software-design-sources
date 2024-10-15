import org.junit.Test;
import static org.junit.Assert.*;

import java.util.List;

public class HeapTest {
  @Test()
  public void minHeapPeekTest() {
    Heap<Integer> minHeap = new Heap<>();
    assertEquals(null, minHeap.peek());

    minHeap.push(100);
    assertEquals(Integer.valueOf(100), minHeap.peek());

    minHeap.push(70);
    assertEquals(Integer.valueOf(70), minHeap.peek());

    minHeap.push(50);
    assertEquals(Integer.valueOf(50), minHeap.peek());

    minHeap.push(125);
    assertEquals(Integer.valueOf(50), minHeap.peek());

    minHeap.push(45);
    assertEquals(Integer.valueOf(45), minHeap.peek());

    minHeap.push(60);
    assertEquals(Integer.valueOf(45), minHeap.peek());

    minHeap.push(10);
    assertEquals(Integer.valueOf(10), minHeap.peek());
  }

  @Test()
  public void minHeapPushTest() {
    Heap<Integer> minHeap = new Heap<>();
    assertEquals("[null]", minHeap.toString());

    minHeap.push(100);
    assertEquals("[null, 100]", minHeap.toString());

    minHeap.push(70);
    assertEquals("[null, 70, 100]", minHeap.toString());

    minHeap.push(50);
    assertEquals("[null, 50, 100, 70]", minHeap.toString());

    minHeap.push(125);
    assertEquals("[null, 50, 100, 70, 125]", minHeap.toString());

    minHeap.push(45);
    assertEquals("[null, 45, 50, 70, 125, 100]", minHeap.toString());

    minHeap.push(60);
    assertEquals("[null, 45, 50, 60, 125, 100, 70]", minHeap.toString());

    minHeap.push(10);
    assertEquals("[null, 10, 50, 45, 125, 100, 70, 60]", minHeap.toString());
  }

  @Test()
  public void minHeapPushPollTest() {
    Heap<Integer> minHeap = new Heap<>();
    assertEquals(null, minHeap.poll());

    minHeap.push(50);
    assertEquals(Integer.valueOf(50), minHeap.poll());
    assertEquals(null, minHeap.poll());

    minHeap.push(60);
    minHeap.push(10);
    minHeap.push(30);
    assertEquals(Integer.valueOf(10), minHeap.poll());
    assertEquals(Integer.valueOf(30), minHeap.poll());
    assertEquals(Integer.valueOf(60), minHeap.poll());
    assertEquals(null, minHeap.poll());
  }

  @Test()
  public void minHeapHeapifyTest() {
    List<Integer> items = List.of(60, 50, 40, 30, 20, 10);
    Heap<Integer> minHeap = new Heap<>(items);

    assertEquals("[null, 10, 20, 40, 30, 50, 60]", minHeap.toString());
  }

  @Test()
  public void maxHeapPeekTest() {
    Heap<Integer> maxHeap = new Heap<>((a, b) -> b - a);
    assertEquals(null, maxHeap.peek());

    maxHeap.push(50);
    assertEquals(Integer.valueOf(50), maxHeap.peek());

    maxHeap.push(60);
    assertEquals(Integer.valueOf(60), maxHeap.peek());

    maxHeap.push(10);
    assertEquals(Integer.valueOf(60), maxHeap.peek());

    maxHeap.push(20);
    assertEquals(Integer.valueOf(60), maxHeap.peek());

    maxHeap.push(80);
    assertEquals(Integer.valueOf(80), maxHeap.peek());

    maxHeap.push(90);
    assertEquals(Integer.valueOf(90), maxHeap.peek());
  }

  @Test()
  public void maxHeapPushTest() {
    Heap<Integer> maxHeap = new Heap<>((a, b) -> b - a);
    assertEquals("[null]", maxHeap.toString());

    maxHeap.push(50);
    assertEquals("[null, 50]", maxHeap.toString());

    maxHeap.push(20);
    assertEquals("[null, 50, 20]", maxHeap.toString());

    maxHeap.push(30);
    assertEquals("[null, 50, 20, 30]", maxHeap.toString());

    maxHeap.push(60);
    assertEquals("[null, 60, 50, 30, 20]", maxHeap.toString());

    maxHeap.push(40);
    assertEquals("[null, 60, 50, 30, 20, 40]", maxHeap.toString());

    maxHeap.push(80);
    assertEquals("[null, 80, 50, 60, 20, 40, 30]", maxHeap.toString());

    maxHeap.push(70);
    assertEquals("[null, 80, 50, 70, 20, 40, 30, 60]", maxHeap.toString());
  }

  @Test()
  public void maxHeapPushPollTest() {
    Heap<Integer> minHeap = new Heap<>((a, b) -> b - a);
    assertEquals(null, minHeap.poll());

    minHeap.push(50);
    assertEquals(Integer.valueOf(50), minHeap.poll());
    assertEquals(null, minHeap.poll());

    minHeap.push(60);
    minHeap.push(10);
    minHeap.push(30);
    assertEquals(Integer.valueOf(60), minHeap.poll());
    assertEquals(Integer.valueOf(30), minHeap.poll());
    assertEquals(Integer.valueOf(10), minHeap.poll());
    assertEquals(null, minHeap.poll());
  }

  @Test()
  public void maxHeapHeapifyTest() {
    List<Integer> items = List.of(4, 1, 3, 2, 16, 9, 10, 14, 8, 7);
    Heap<Integer> maxHeap = new Heap<>(items, (a, b) -> b - a);

    assertEquals("[null, 16, 14, 10, 8, 7, 9, 3, 2, 4, 1]", maxHeap.toString());
  }
}
