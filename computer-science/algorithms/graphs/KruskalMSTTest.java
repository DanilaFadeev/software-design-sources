package algorithms.graphs;

import java.util.List;

import static org.junit.Assert.assertEquals;
import org.junit.Before;
import org.junit.Test;

public class KruskalMSTTest {
  int[][] edges1;
  int[][] edges2;

  @Before()
  public void setup() {
    edges1 = new int[][] {
      { 0, 1, 10 }, { 0, 2, 1 }, { 0, 3, 4 },
      { 1, 2, 3 }, { 1, 4, 0 },
      { 2, 3, 2 }, { 2, 5, 8 },
      { 3, 5, 2 }, { 3, 6, 7 },
      { 4, 5, 1 }, { 4, 7, 8 },
      { 5, 6, 6 }, { 5, 7, 9 },
      { 6, 7, 12 }
    };
    edges2 = new int[][] {
      { 0, 1, 10 }, { 0, 2, 1 }, { 0, 3, 4 },
      { 1, 2, 3 },
      { 2, 3, 2 },
      { 3, 4, 2 },
      { 5, 6, 4 } // not connected to other nodes
    };
  }

  @Test()
  public void getMSTCost() {
    assertEquals(20, KruskalMST.getMSTCost(edges1, 8));
  }

  @Test()
  public void getMSTCostIfNotExists() {
    assertEquals(-1, KruskalMST.getMSTCost(edges2, 7));
  }

  @Test()
  public void getMSTEdges() {
    List<int[]> edges = KruskalMST.getMSTEdges(edges1, 8);
    assertEquals(7, edges.size());
    assertEquals(20, edges.stream().mapToInt(o -> o[2]).sum());
  }

  @Test()
  public void getMSTEdgesIfNotExists() {
    List<int[]> edges = KruskalMST.getMSTEdges(edges2, 7);
    assertEquals(null, edges);
  }
}
