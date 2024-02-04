import org.junit.Test;
import static org.junit.Assert.*;

public class SinglyLinkedListTest {
  private SinglyLinkedList<Integer> getFilledList() {
    SinglyLinkedList<Integer> list = new SinglyLinkedList<>();
    list.add(10);
    list.add(20);
    list.add(30);
    list.add(40);
    list.add(50);

    return list;
  }

  @Test()
  public void addTest() {
    SinglyLinkedList<Integer> list = new SinglyLinkedList<>();

    list.add(1);
    assertEquals("1", list.toString());

    list.add(2);
    assertEquals("1 -> 2", list.toString());

    list.add(3);
    assertEquals("1 -> 2 -> 3", list.toString());
  }

  @Test()
  public void addFirstTest() {
    SinglyLinkedList<Integer> list = getFilledList();

    list.addFirst(5);
    assertEquals("5 -> 10 -> 20 -> 30 -> 40 -> 50", list.toString());

    list.addFirst(0);
    assertEquals("0 -> 5 -> 10 -> 20 -> 30 -> 40 -> 50", list.toString());
  }

  @Test()
  public void removeTest() {
    SinglyLinkedList<Integer> list = getFilledList();

    // Remove from the head of the list
    list.remove(0);
    assertEquals("20 -> 30 -> 40 -> 50", list.toString());

    // Remove from the end of the list
    list.remove(3);
    assertEquals("20 -> 30 -> 40", list.toString());

    // Remove from the middle of the list
    list.remove(1);
    assertEquals("20 -> 40", list.toString());
  }

  @Test()
  public void getTest() {
    SinglyLinkedList<Integer> list = getFilledList();

    assertTrue(10 == list.get(0));
    assertTrue(20 == list.get(1));
    assertTrue(30 == list.get(2));
    assertTrue(40 == list.get(3));
    assertTrue(50 == list.get(4));
  }
}
