package algorithms.graphs;

import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

public class Dijkstra {

  /**
   * Executes Dijkstra's algorithm on the provided graph to find the shortest
   * paths from the source vertex to all other vertices.
   *
   * @param graph  The graph represented as an adjacency list.
   * @param source The source vertex.
   * @param target The target vertex.
   * @return The shortest path and distance from the {@code source} vertex to {@code target} vertex.
   */
  public static Entry<List<Integer>, Double> getShortestPath(Map<Integer, List<Entry<Integer, Double>>> graph, int source, int target) {
    int N = graph.size();

    // Stores the previous vertex that led to the i-th vertex
    int[] previous = new int[N];
    Arrays.fill(previous, -1);

    // Stores the shortest distance to i-th vertex
    double[] distances = new double[N];
    Arrays.fill(distances, Integer.MAX_VALUE);
    distances[source] = 0;

    // Keeps track of the visited vertices
    boolean[] visited = new boolean[N];

    for (int i = 0; i < N; i++) {
      int vertex = getMinDistanceVertex(distances, visited);
      visited[vertex] = true;

      for (Entry<Integer, Double> next : graph.get(vertex)) {
        int nextVertex = next.getKey();
        double distance = distances[vertex] + next.getValue();

        if (!visited[nextVertex] && distance < distances[nextVertex]) {
          distances[nextVertex] = distance;
          previous[nextVertex] = vertex;
        }
      }
    }

    return Map.entry(getShortestPath(previous, target), distances[target]);
  }

  /**
   * Finds the vertex with the minimum distance value from the set of vertices
   * that have not yet been processed.
   *
   * @param distances The array of current shortest distances from the source vertex.
   * @param processed The array indicating whether each vertex has been processed.
   * @return The index of the vertex with the minimum distance value.
   */
  private static int getMinDistanceVertex(double[] distances, boolean[] visited) {
    int minIndex = -1;
    double min = Double.MAX_VALUE;

    for (int i = 0; i < distances.length; i++)
      if (!visited[i] && distances[i] < min) {
        min = distances[i];
        minIndex = i;
      }

    return minIndex;
  }

  /**
   * Builds a shortest path to the target vertex, represented as a linked list.
   *
   * @param previous The array of previous vertices for each i-th vertex.
   * @param v        The index of the target vertex.
   * @return A linked list with an index of the vertices.
   */
  private static List<Integer> getShortestPath(int[] previous, int v) {
    LinkedList<Integer> path = new LinkedList<>();
    path.add(v);

    while (previous[v] != -1) {
      path.addFirst(previous[v]);
      v = previous[v];
    }

    return path;
  }

}
