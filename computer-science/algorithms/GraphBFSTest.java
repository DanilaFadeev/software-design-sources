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

  @Test()
  public void bfs_0_1() {
    Map<Integer, List<int[]>> graph = new HashMap<>();
    graph.put(1, List.of(new int[] { 2, 1 }, new int[] { 3, 0 }));
    graph.put(2, List.of());
    graph.put(3, List.of(new int[] { 2, 0 }));

    assertEquals(0, GraphBFS.bfs_0_1(graph, 1, 2));
  }

  @Test()
  public void bfs_0_1_distances() {
    Map<Integer, List<int[]>> graph = new HashMap<>();
    graph.put(1, List.of(new int[] { 2, 1 }, new int[] { 3, 0 }));
    graph.put(2, List.of(new int[] { 3, 1 }));
    graph.put(3, List.of(new int[] { 4, 1 }, new int[] { 5, 0 }));
    graph.put(4, List.of(new int[] { 5, 1 }));
    graph.put(5, List.of(new int[] { 4, 0 }));

    Map<Integer, Integer> distances = GraphBFS.bfs_0_1_distances(graph, 1);
    assertEquals(Integer.valueOf(1), distances.get(2)); // 1 -> 2
    assertEquals(Integer.valueOf(0), distances.get(3)); // 1 -> 3
    assertEquals(Integer.valueOf(0), distances.get(4)); // 1 -> 3 -> 5 -> 4
    assertEquals(Integer.valueOf(0), distances.get(5)); // 1 -> 3 -> 5
  }
}
