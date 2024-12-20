package algorithms.graphs;

import static org.junit.Assert.*;
import org.junit.*;

import java.util.*;
import algorithms.graphs.BellmanFord.Edge;

public class BellmanFordTest {
  Map<Integer, List<Edge>> graph;

  @Before()
  public void setup() {
    graph = new HashMap<>();
    graph.put(0, List.of(new BellmanFord.Edge(1, 5)));
    graph.put(1, List.of(new Edge(2, 20), new Edge(5, 30), new Edge(6, 60)));
    graph.put(2, List.of(new Edge(3, 10), new Edge(4, 75)));
    graph.put(3, List.of(new Edge(2, -15)));
    graph.put(4, List.of(new Edge(9, 100)));
    graph.put(5, List.of(new Edge(4, 25), new Edge(6, 5), new Edge(8, 50)));
    graph.put(6, List.of(new Edge(7, -50)));
    graph.put(7, List.of(new Edge(8, -10)));
    graph.put(8, List.of());
    graph.put(9, List.of());
  }

  @Test()
  public void getShortestDistancesTest() {
    double INF = Double.NEGATIVE_INFINITY;
    double[] distances = BellmanFord.getShortestDistances(graph, 0);

    assertArrayEquals(new double[] { 0.0, 5.0, INF, INF, INF, 35.0, 40.0, -10.0, -20.0, INF }, distances, 0);
  }
}
