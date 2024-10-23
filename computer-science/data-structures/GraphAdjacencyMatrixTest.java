import org.junit.Test;
import static org.junit.Assert.*;

public class GraphAdjacencyMatrixTest {
  @Test()
  public void bfsTraversalTest() {
    String[][] edges = {
      { "A", "B" },
      { "A", "C" },
      { "A", "G" },
      { "C", "B" },
      { "B", "D" },
      { "D", "G" },
    };

    GraphAdjacencyMatrix graph = new GraphAdjacencyMatrix(edges);

    assertArrayEquals(
      new String[] { "A", "B", "C", "G", "D" },
      graph.bfsTraversal("A").toArray()
    );
    assertArrayEquals(
      new String[] { "B", "A", "C", "D", "G" },
      graph.bfsTraversal("B").toArray()
    );
    assertArrayEquals(
      new String[] { "C", "A", "B", "G", "D" },
      graph.bfsTraversal("C").toArray()
    );
    assertArrayEquals(
      new String[] { "G", "A", "D", "B", "C" },
      graph.bfsTraversal("G").toArray()
    );
    assertArrayEquals(
      new String[] { "D", "B", "G", "A", "C" },
      graph.bfsTraversal("D").toArray()
    );
  }

  @Test()
  public void bfsIfPathExists() {
    String[][] edges = {
      { "A", "B" },
      { "B", "C" },
      { "B", "B" },
      { "D", "E" },
      { "E", "F" },
      { "F", "D" }
    };

    GraphAdjacencyMatrix graph = new GraphAdjacencyMatrix(edges);

    assertEquals(true, graph.bfsIfPathExists("A", "B"));
    assertEquals(true, graph.bfsIfPathExists("B", "A"));
    assertEquals(true, graph.bfsIfPathExists("A", "C"));
    assertEquals(false, graph.bfsIfPathExists("A", "D"));
    assertEquals(false, graph.bfsIfPathExists("B", "D"));
    assertEquals(true, graph.bfsIfPathExists("D", "F"));
    assertEquals(true, graph.bfsIfPathExists("F", "E"));
  }
}
