package algorithms.graphs;

import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class GraphDFSTest {
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
    List<Integer> vertices = List.of(1, 2, 3, 8, 4, 5, 6, 7);
    assertEquals(vertices, GraphDFS.traverse(graph, 1));
  }

  @Test()
  public void countPaths() {
    // 1 -> 3 -> 8
    // 1 -> 2 -> 3 -> 8
    // 1 -> 2 -> 4 -> 6 -> 8
    assertEquals(3, GraphDFS.countPaths(graph, 1, 8));
  }
}
