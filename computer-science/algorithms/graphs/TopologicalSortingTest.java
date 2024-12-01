package algorithms.graphs;

import static org.junit.Assert.assertEquals;
import org.junit.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class TopologicalSortingTest {
  private Map<Integer, List<Integer>> graph;
  private Map<Integer, List<Integer>> cyclicGraph;

  @Before()
  public void setup() {
    graph = new HashMap<>();
    graph.put(0, List.of(1));
    graph.put(1, List.of(2));
    graph.put(2, List.of(3));
    graph.put(3, List.of());

    cyclicGraph = new HashMap<>();
    cyclicGraph.put(0, List.of(1));
    cyclicGraph.put(1, List.of(2));
    cyclicGraph.put(2, List.of(0));
  }

  @Test()
  public void runKahnsAlgorithm() {
    assertEquals(List.of(0, 1, 2, 3), TopologicalSorting.runKahnsAlgorithm(graph));
  }

  @Test()
  public void runKahnsAlgorithmWithCycle() {
    assertEquals(null, TopologicalSorting.runKahnsAlgorithm(cyclicGraph));
  }

  @Test()
  public void runDFS() {
    assertEquals(List.of(0, 1, 2, 3), TopologicalSorting.runDFS(graph));
  }

  @Test()
  public void runDFSWithCycle() {
    assertEquals(null, TopologicalSorting.runDFS(cyclicGraph));
  }
}
