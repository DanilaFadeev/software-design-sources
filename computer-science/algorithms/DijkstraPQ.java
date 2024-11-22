import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;
import java.util.Map.Entry;

public class DijkstraPQ {
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
    int[] parent = new int[N];
    Arrays.fill(parent, -1);

    // Stores the shortest distance to i-th vertex
    double[] distances = new double[N];
    Arrays.fill(distances, Integer.MAX_VALUE);
    distances[source] = 0;

    // Keeps track of the visited vertices
    boolean[] visited = new boolean[N];

    // Use MinHeap to access the vertex with the shortest distance to it
    PriorityQueue<Entry<Integer, Double>> minPq = new PriorityQueue<>(
        (a, b) -> Double.compare(a.getValue(), b.getValue())
    );
    minPq.add(Map.entry(source, 0.0));

    while (!minPq.isEmpty()) {
      Entry<Integer, Double> vertex = minPq.poll();
      if (visited[vertex.getKey()])
        continue;

      visited[vertex.getKey()] = true;
      distances[vertex.getKey()] = vertex.getValue();

      for (Entry<Integer, Double> nextV : graph.get(vertex.getKey())) {
        int nextVertex = nextV.getKey();
        double distance = vertex.getValue() + nextV.getValue();

        if (distance < distances[nextVertex]) {
          minPq.add(Map.entry(nextVertex, distance));
          parent[nextVertex] = vertex.getKey();
        }
      }
    }

    List<Integer> shortestPath = getShortestPath(parent, target);

    return Map.entry(shortestPath, distances[target]);
  }

  /**
   * Builds a shortest path to the target vertex, represented as a linked list.
   *
   * @param parent The array of parent vertices for each i-th vertex.
   * @param v      The index of the target vertex.
   * @return A linked list with an index of the vertices.
   */
  private static List<Integer> getShortestPath(int[] parent, int vertex) {
    LinkedList<Integer> path = new LinkedList<>();
    path.add(vertex);

    while (parent[vertex] != -1) {
      path.addFirst(parent[vertex]);
      vertex = parent[vertex];
    }

    return path;
  }
}
