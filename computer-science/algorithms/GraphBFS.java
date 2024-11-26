import java.util.*;

public class GraphBFS {
  /**
   * Traverse all the vertices in the {@code graph} starting with {@code source} vertex.
   */
  public static List<Integer> traverse(Map<Integer, List<Integer>> graph, int source) {
    Set<Integer> visited = new HashSet<>();

    Queue<Integer> queue = new LinkedList<>();
    queue.add(source);

    List<Integer> vertices = new ArrayList<>();

    while (!queue.isEmpty()) {
      int vertex = queue.poll();
      if (visited.contains(vertex)) continue;

      visited.add(vertex);
      vertices.add(vertex);

      for (int nextVertex : graph.getOrDefault(vertex, List.of()))
        queue.add(nextVertex);
    }

    return vertices;
  }

  /**
   * Finds the shortest path between {@code source} and {@code target} vertices
   * in a {@code graph}, represented as an adjacency list.
   */
  public static int shortestPath(Map<Integer, List<Integer>> graph, int source, int target) {
    Set<Integer> visited = new HashSet<>();

    Queue<Integer> queue = new LinkedList<>();
    queue.add(source);

    int path = 0;
    while (!queue.isEmpty()) {
      int size = queue.size();
      while (size-- > 0) {
        int vertex = queue.poll();
        if (visited.contains(vertex)) continue;

        if (vertex == target)
          return path;

        for (int nextVertex : graph.getOrDefault(vertex, List.of()))
          queue.add(nextVertex);
      }
      path++;
    }

    return path;
  }
}
