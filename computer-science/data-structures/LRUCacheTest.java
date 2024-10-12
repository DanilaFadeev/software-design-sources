import org.junit.Test;
import static org.junit.Assert.*;

public class LRUCacheTest {
  @Test()
  public void singleElementCapacity() {
    LRUCache<String, Integer> cache = new LRUCache<>(1);
    assertEquals(null, cache.get("jhon"));

    cache.put("jhon", 10);
    assertEquals(Integer.valueOf(10), cache.get("jhon"));
    assertEquals(null, cache.get("doe"));

    cache.put("james", 20);
    assertEquals(Integer.valueOf(20), cache.get("james"));
    assertEquals(null, cache.get("jhon"));
    assertEquals(null, cache.get("doe"));

    cache.put("james", 50);
    assertEquals(Integer.valueOf(50), cache.get("james"));
    assertEquals(null, cache.get("jhon"));
    assertEquals(null, cache.get("doe"));
  }

  @Test()
  public void multiElementCapacity() {
    LRUCache<Integer, Integer> cache = new LRUCache<>(3);

    cache.put(10, 100);
    cache.put(20, 200);
    cache.put(30, 300);

    assertEquals(Integer.valueOf(100), cache.get(10));
    assertEquals(Integer.valueOf(200), cache.get(20));
    assertEquals(Integer.valueOf(300), cache.get(30));

    cache.put(40, 400);
    assertEquals(null, cache.get(10));
    assertEquals(Integer.valueOf(200), cache.get(20));
    assertEquals(Integer.valueOf(300), cache.get(30));
    assertEquals(Integer.valueOf(400), cache.get(40));
  }
}
