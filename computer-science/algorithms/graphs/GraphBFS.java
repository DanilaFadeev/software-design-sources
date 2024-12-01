package algorithms.graphs;

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

  /**
   * The 0-1 BFS Algorithm calculates the shortest path in a weighted graph,
   * provided the edges have weights 0 or 1 only.
   * 
   * Use cases:
   * - All the edges in the graph have weights either 0 or w, where w is not equal to 0
   * - We have choices to make, where some choices have cost equal to 0, whereas the other choices have cost w,
   *   where w is not equal to 0, and we have to minimize the cost while performing these choices.
   * 
   * Time Complexity: O(E)
   * 
   * @param graph is a directed weighted graph represented as adjacency list.
   * @return the shortest path between {@code source} and {@code target} vertices.
   */
  public static int bfs_0_1(Map<Integer, List<int[]>> graph, int source, int target) {
    Set<Integer> visited = new HashSet<>();

    Deque<int[]> queue = new ArrayDeque<>();
    queue.add(new int[] { source, 0 });

    while (!queue.isEmpty()) {
      int[] vertex = queue.pollFirst();
      if (visited.contains(vertex[0])) continue;

      if (vertex[0] == target) return vertex[1];
      visited.add(vertex[0]);

      for (int[] nextVertex : graph.get(vertex[0])) {
        if (nextVertex[1] == 0) {
          queue.addFirst(new int[] { nextVertex[0], vertex[1] });
        } else {
          queue.addLast(new int[] { nextVertex[0], vertex[1] + 1 });
        }
      }
    }

    return -1;
  }

  public static Map<Integer, Integer> bfs_0_1_distances(Map<Integer, List<int[]>> graph, int source) {
    Map<Integer, Integer> distances = new HashMap<>();
    for (int v : graph.keySet()) distances.put(v, Integer.MAX_VALUE);
    distances.put(source, 0);

    Deque<Integer> queue = new ArrayDeque<>();
    queue.add(source);

    while (!queue.isEmpty()) {
      int vertex = queue.pollFirst();

      // Checking all the neighbors
      for (int[] pair : graph.get(vertex)) {
        int nextVertex = pair[0];
        int distance = pair[1];
        int newDistance = distances.get(vertex) + distance;

         // If the current distance is less than existing
        if (newDistance < distances.get(nextVertex)) {
          if (distance == 0) {
            queue.addFirst(nextVertex);
          } else {
            queue.addLast(nextVertex);
          }
          distances.put(nextVertex, newDistance);
        }
      }
    }

    return distances;
  }
}
