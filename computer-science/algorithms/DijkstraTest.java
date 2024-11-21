import org.junit.Test;
import org.junit.Before;
import static org.junit.Assert.*;

import java.util.*;
import java.util.Map.Entry;

public class DijkstraTest {

  private Map<Integer, List<Entry<Integer, Double>>> graph = new HashMap<>();

  @Before
  public void setUp() {
    graph.put(0, List.of(Map.entry(1, 2.0), Map.entry(2, 4.0), Map.entry(4, 10.0)));
    graph.put(1, List.of(Map.entry(2, 1.0), Map.entry(3, 7.0), Map.entry(4, 6.0)));
    graph.put(2, List.of(Map.entry(3, 3.0), Map.entry(5, 8.0)));
    graph.put(3, List.of(Map.entry(5, 1.0)));
    graph.put(4, List.of(Map.entry(5, 2.0), Map.entry(6, 1.0)));
    graph.put(5, List.of(Map.entry(6, 3.0)));
    graph.put(6, List.of());
  }

  @Test
  public void testShortestPathSameNode() {
    // The shortest path from a node to itself should be 0.
    var result = Dijkstra.getShortestPath(graph, 0, 0);
    assertEquals(0.0, result.getValue(), 0);
    assertEquals(List.of(0), result.getKey());
  }

  @Test
  public void testShortestPathDirectConnection() {
    // Direct connection from 0 to 1
    var result = Dijkstra.getShortestPath(graph, 0, 1);
    assertEquals(2.0, result.getValue(), 0);
    assertEquals(List.of(0, 1), result.getKey());
  }

  @Test
  public void testShortestPathComplexPath() {
    // Testing paths that require more hops
    var result1 = Dijkstra.getShortestPath(graph, 0, 2); // Path 0 -> 1 -> 2
    assertEquals(3.0, result1.getValue(), 0);
    assertEquals(List.of(0, 1, 2), result1.getKey());

    var result2 = Dijkstra.getShortestPath(graph, 0, 3); // Path 0 -> 1 -> 2 -> 3
    assertEquals(6.0, result2.getValue(), 0);
    assertEquals(List.of(0, 1, 2, 3), result2.getKey());

    var result3 = Dijkstra.getShortestPath(graph, 0, 5); // Path 0 -> 1 -> 2 -> 3 -> 5
    assertEquals(7.0, result3.getValue(), 0);
    assertEquals(List.of(0, 1, 2, 3, 5), result3.getKey());
  }

  @Test
  public void testShortestPathMultipleConnections() {
    // Multiple possible connections with varying weights
    var result1 = Dijkstra.getShortestPath(graph, 0, 4); // Path 0 -> 1 -> 4
    assertEquals(8.0, result1.getValue(), 0);
    assertEquals(List.of(0, 1, 4), result1.getKey());

    var result2 = Dijkstra.getShortestPath(graph, 0, 6); // Path 0 -> 1 -> 4 -> 6
    assertEquals(9.0, result2.getValue(), 0);
    assertEquals(List.of(0, 1, 4, 6), result2.getKey());
  }

  @Test
  public void testShortestPathLongerRoute() {
    // Check a longer route that goes through several nodes

    var result = Dijkstra.getShortestPath(graph, 2, 6); // Path 2 -> 3 -> 5 -> 6
    assertEquals(7.0, result.getValue(), 0);
    assertEquals(List.of(2, 3, 5, 6), result.getKey());
  }
}
