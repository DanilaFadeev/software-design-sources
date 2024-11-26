import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class GraphBFSTest {
  Map<Integer, List<Integer>> graph;

  @Before()
  public void setup() {
    graph = new HashMap<>();
    graph.put(1, List.of(2, 3));
    graph.put(2, List.of(3, 4));
    graph.put(3, List.of( 8));
    graph.put(4, List.of( 5, 6, 7));
    graph.put(6, List.of( 8));
  }

  @Test()
  public void traverse() {
    List<Integer> vertices = List.of(1, 2, 3, 4, 8, 5, 6, 7);
    assertEquals(vertices, GraphBFS.traverse(graph, 1));
  }

  @Test()
  public void shortestPath() {
    // 1 -> 3 -> 8
    // 1 -> 2 -> 3 -> 8
    // 1 -> 2 -> 4 -> 6 -> 8
    assertEquals(2, GraphBFS.shortestPath(graph, 1, 8));
  }
}
