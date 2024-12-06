package algorithms.graphs;

import static org.junit.Assert.assertEquals;

import java.util.*;
import org.junit.Before;
import org.junit.Test;

public class KosarajuSharirTest {
  Map<Integer, List<Integer>> graph;

  @Before()
  public void setup() {
    graph = new HashMap<>();
    graph.put(0, List.of(1, 5));
    graph.put(1, List.of());
    graph.put(2, List.of(0, 3));
    graph.put(3, List.of(2, 5));
    graph.put(4, List.of(2, 3));
    graph.put(5, List.of(4));
    graph.put(6, List.of(0, 4, 8, 9));
    graph.put(7, List.of(6));
    graph.put(8, List.of(6));
    graph.put(9, List.of(10, 11));
    graph.put(10, List.of(12));
    graph.put(11, List.of(12, 4));
    graph.put(12, List.of(9));
  }

  @Test()
  public void getComponentsCount() {
    KosarajuSharir ks = new KosarajuSharir(graph);
    assertEquals(5, ks.getComponentsCount());
  }

  @Test()
  public void getComponentId() {
    KosarajuSharir ks = new KosarajuSharir(graph);

    assertEquals(0, ks.getComponentId(1));

    assertEquals(1, ks.getComponentId(0));
    assertEquals(1, ks.getComponentId(2));
    assertEquals(1, ks.getComponentId(3));
    assertEquals(1, ks.getComponentId(4));
    assertEquals(1, ks.getComponentId(5));

    assertEquals(2, ks.getComponentId(9));
    assertEquals(2, ks.getComponentId(10));
    assertEquals(2, ks.getComponentId(11));
    assertEquals(2, ks.getComponentId(12));

    assertEquals(3, ks.getComponentId(6));
    assertEquals(3, ks.getComponentId(8));

    assertEquals(4, ks.getComponentId(7));
  }
}
