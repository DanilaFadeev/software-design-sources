package algorithms.graphs;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

// Kosaraju-Sharir's algorithm (also known as Kosaraju's algorithm) is a linear time algorithm 
// to find the strongly connected components of a directed graph.
// A strong component is a maximal subset of strongly-connected vertices.
public class KosarajuSharir {
  // Graph vertices with assigned strongly connected component ids
  // sccIds[i] - component id of i-th vertex
  private int[] sccIds;

  // The total number of strongly-connected components
  private int sccCount = 0;

  public KosarajuSharir(Map<Integer, List<Integer>> graph) {
    Map<Integer, List<Integer>> reversedGraph = reverseGraph(graph);
    List<Integer> vertices = getDfsOrder(reversedGraph);

    sccIds = new int[vertices.size()];
    verticesToSCC(graph, vertices);
  }

  public int getComponentId(int v) {
    return sccIds[v];
  }

  public int getComponentsCount() {
    return sccCount;
  }

  /**
   * @param graph The graph represented as an adjacency list
   * @return a list of topologically sorted graph vertices 
   */
  private List<Integer> getDfsOrder(Map<Integer, List<Integer>> graph) {
    Set<Integer> visited = new HashSet<>();
    List<Integer> vertices = new ArrayList<>();

    for (int v = 0; v < graph.size(); v++)
      if (!visited.contains(v))
        getDfsOrder(graph, visited, vertices, v);

    Collections.reverse(vertices);
    return vertices;
  }

  private void getDfsOrder(Map<Integer, List<Integer>> graph, Set<Integer> visited, List<Integer> vertices, int vertex) {
    visited.add(vertex);

    for (int v : graph.getOrDefault(vertex, List.of()))
      if (!visited.contains(v))
        getDfsOrder(graph, visited, vertices, v);

    vertices.add(vertex);
  }

  /**
   * 
   * @param graph The graph represented as an adjacency list.
   * @param vertices An ordered list of {@code graph} vertices
   */
  private void verticesToSCC(Map<Integer, List<Integer>> graph, List<Integer> vertices) {
    Set<Integer> visited = new HashSet<>();

    for (int vertex : vertices)
      if (!visited.contains(vertex))
        verticesToSCC(graph, visited, vertex, sccCount++);
  }

  private void verticesToSCC(Map<Integer, List<Integer>> graph, Set<Integer> visited, int vertex, int componentId) {
    visited.add(vertex);
    sccIds[vertex] = componentId;

    for (int v : graph.getOrDefault(vertex, List.of()))
      if (!visited.contains(v))
        verticesToSCC(graph, visited, v, componentId);
  }

  /**
   * @param graph The graph represented as an adjacency list.
   * @return a new graph with all the edges inverted
   */
  private static Map<Integer, List<Integer>> reverseGraph(Map<Integer, List<Integer>> graph) {
    Map<Integer, List<Integer>> reversed = new HashMap<>();

    for (int v : graph.keySet())
      for (int w : graph.get(v))
        reversed.computeIfAbsent(w, (k) -> new ArrayList<>()).add(v);

    return reversed;
  }
}