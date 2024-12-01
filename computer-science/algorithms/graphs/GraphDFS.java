package algorithms.graphs;

import java.util.Map;
import java.util.Set;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

public class GraphDFS {
  /**
   * Traverse all the vertices in the {@code graph} starting with {@code source} vertex.
   * Time Complexity: O(V+E)
   */
  public static List<Integer> traverse(Map<Integer, List<Integer>> graph, int source) {
    List<Integer> vertices = new ArrayList<>();
    traverse(graph, source, new HashSet<>(), vertices);
    return vertices;
  }

  private static void traverse(Map<Integer, List<Integer>> graph, int vertex, Set<Integer> visited, List<Integer> vertices) {
    visited.add(vertex);
    vertices.add(vertex);
  
    for (Integer nextVertex : graph.getOrDefault(vertex, List.of())) {
      if (!visited.contains(nextVertex)) {
        traverse(graph, nextVertex, visited, vertices);
      }
    }
  }

  /**
   * Counts all the possible paths between {@code source} and {@code target} vertices
   * in a {@code graph}, represented as an adjacency list.
   * 
   * The algorithm uses DFS approach and Backtracking.
   * Time complexity: O(N^V)
   */
  public static int countPaths(Map<Integer, List<Integer>> graph, int source, int target) {
    return countPaths(graph, source, target, new HashSet<>());
  }

  private static int countPaths(Map<Integer, List<Integer>> graph, int vertex, int target, Set<Integer> visited) {
    if (visited.contains(vertex))
      return 0;
    if (vertex == target)
      return 1;
    
    int count = 0;

    visited.add(vertex);
    for (Integer nextVertex : graph.getOrDefault(vertex, List.of()))
      count += countPaths(graph, nextVertex, target, visited);
    visited.remove(vertex);

    return count;
  }
}