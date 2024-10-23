import org.junit.Test;
import static org.junit.Assert.*;

import java.util.HashSet;

public class GraphAdjacencyListTest {
  private String[][] edges = {
    { "A", "B" },
    { "A", "C" },
    { "A", "G" },
    { "C", "B" },
    { "B", "D" },
    { "D", "G" },
    { "G", "E" }
  };

  @Test()
  public void bfsShortestPathTest() {
    GraphAdjacencyList graph = new GraphAdjacencyList(edges);

    assertEquals(1, graph.bfsShortestPath("A", "B"));
    assertEquals(1, graph.bfsShortestPath("A", "C"));
    assertEquals(1, graph.bfsShortestPath("A", "G"));
    assertEquals(1, graph.bfsShortestPath("B", "A"));
    assertEquals(1, graph.bfsShortestPath("C", "A"));
    assertEquals(1, graph.bfsShortestPath("G", "A"));

    assertEquals(2, graph.bfsShortestPath("A", "D"));
    assertEquals(2, graph.bfsShortestPath("A", "E"));
    assertEquals(3, graph.bfsShortestPath("B", "E"));
  }

  @Test()
  public void dfsCountPathsTest() {
    GraphAdjacencyList graph = new GraphAdjacencyList(edges);

    assertEquals(3, graph.dfsCountPaths("A", "B", new HashSet<>()));
    assertEquals(3, graph.dfsCountPaths("A", "E", new HashSet<>()));
    assertEquals(1, graph.dfsCountPaths("G", "E", new HashSet<>()));
  }
}
