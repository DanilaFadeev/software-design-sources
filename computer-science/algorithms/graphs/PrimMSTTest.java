package algorithms.graphs;

import static org.junit.Assert.assertEquals;

import org.junit.*;
import java.util.*;

public class PrimMSTTest {
  Map<Integer, List<int[]>> graph1;
  Map<Integer, List<int[]>> graph2;

  @Before()
  public void setup() {
    graph1 = buildAdjacencyList(
      List.of(
        new int[] { 0, 1, 10 },
        new int[] { 0, 2, 1 },
        new int[] { 0, 3, 4 },
        new int[] { 1, 2, 3 },
        new int[] { 1, 4, 0 },
        new int[] { 2, 3, 2 },
        new int[] { 2, 5, 8 },
        new int[] { 3, 5, 2 },
        new int[] { 3, 6, 7 },
        new int[] { 4, 5, 1 },
        new int[] { 4, 7, 8 },
        new int[] { 5, 6, 6 },
        new int[] { 5, 7, 9 },
        new int[] { 6, 7, 12 }
      )
    );
    graph2 = buildAdjacencyList(
      List.of(
        new int[] { 0, 1, 10 },
        new int[] { 0, 2, 1 },
        new int[] { 0, 3, 4 },
        new int[] { 1, 2, 3 },
        new int[] { 2, 3, 2 },
        new int[] { 3, 4, 2 },
        new int[] { 5, 6, 4 } // not connected to other nodes
      )
    );
  }

  private Map<Integer, List<int[]>> buildAdjacencyList(List<int[]> edges) {
    Map<Integer, List<int[]>> graph = new HashMap<>();

    for (int[] edge : edges) {
      int from = edge[0], to = edge[1], weight = edge[2];
      graph.computeIfAbsent(from, k -> new ArrayList<>()).add(new int[] { to, weight });
      graph.computeIfAbsent(to, k -> new ArrayList<>()).add(new int[] { from, weight });
    }

    return graph;
  }

  @Test()
  public void getMSTCost() {
    assertEquals(20, PrimMST.getMSTCost(graph1));
  }

  @Test()
  public void getMSTCostIfNotExists() {
    assertEquals(-1, PrimMST.getMSTCost(graph2));
  }

  @Test()
  public void getMSTEdges() {
    List<int[]> edges = PrimMST.getMSTEdges(graph1, 0);
    assertEquals(7, edges.size());
    assertEquals(20, edges.stream().mapToInt(o -> o[2]).sum());
  }

  @Test()
  public void getMSTEdgesIfNotExists() {
    List<int[]> edges = PrimMST.getMSTEdges(graph2, 0);
    assertEquals(null, edges);
  }
}
