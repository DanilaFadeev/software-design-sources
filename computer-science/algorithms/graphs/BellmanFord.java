package algorithms.graphs;

import java.util.Map;
import java.util.List;
import java.util.Arrays;

public class BellmanFord {
  public static class Edge {
    public int to;
    public double weight;

    public Edge(int to, double weight) {
      this.to = to;
      this.weight = weight;
    }
  }

  public static double[] getShortestDistances(Map<Integer, List<Edge>> graph, int start) {
    double[] distTo = new double[graph.size()];
    Arrays.fill(distTo, Double.POSITIVE_INFINITY);
    distTo[start] = 0;

    for (int i = 0; i < graph.size() - 1; i++)
      for (int v = 0; v < graph.size() - 1; v++)
        for (Edge edge : graph.get(v))
          if (distTo[edge.to] > edge.weight + distTo[v])
            distTo[edge.to] = edge.weight + distTo[v];

    // Repeat to find nodes caught in a negative cycle.
    // A negative cycle has occurred if we can find a better path beyond the optimal solution.
    for (int i = 0; i < graph.size() - 1; i++)
      for (int v = 0; v < graph.size() - 1; v++)
        for (Edge edge : graph.get(v))
          if (distTo[edge.to] > edge.weight + distTo[v])
            distTo[edge.to] = Double.NEGATIVE_INFINITY;

    return distTo;
  }
}
