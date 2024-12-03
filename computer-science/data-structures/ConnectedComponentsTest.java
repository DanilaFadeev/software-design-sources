import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

public class ConnectedComponentsTest {
  private Graph graph;

  @Before()
  public void setup() {
    graph = new Graph(13);
    graph.addEdge(0, 1);
    graph.addEdge(0, 2);
    graph.addEdge(0, 5);
    graph.addEdge(0, 6);
    graph.addEdge(3, 4);
    graph.addEdge(3, 5);
    graph.addEdge(4, 5);
    graph.addEdge(4, 6);
    graph.addEdge(7, 8);
    graph.addEdge(9, 10);
    graph.addEdge(9, 11);
    graph.addEdge(9, 12);
    graph.addEdge(11, 12);
  }

  @Test()
  public void getCount() {
    ConnectedComponents cc = new ConnectedComponents(graph);
    assertEquals(3, cc.getCount());
  }

  @Test()
  public void isConnected() {
    ConnectedComponents cc = new ConnectedComponents(graph);
    assertEquals(true, cc.isConnected(0, 1));
    assertEquals(true, cc.isConnected(0, 3));
    assertEquals(false, cc.isConnected(1, 7));
    assertEquals(true, cc.isConnected(7, 8));
    assertEquals(false, cc.isConnected(8, 9));
    assertEquals(true, cc.isConnected(9, 12));
    assertEquals(true, cc.isConnected(10, 10));
  }

  @Test()
  public void getId() {
    ConnectedComponents cc = new ConnectedComponents(graph);
    assertEquals(0, cc.getId(0));
    assertEquals(0, cc.getId(4));
    assertEquals(0, cc.getId(6));
    assertEquals(1, cc.getId(7));
    assertEquals(1, cc.getId(8));
    assertEquals(2, cc.getId(9));
    assertEquals(2, cc.getId(12));
  }
}
