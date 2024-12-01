package algorithms.graphs;

import java.util.Map;
import java.util.Queue;
import java.util.Set;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;

/**
 * A topological ordering is an ordering of the nodes in a directed graph
 * where for each directed edge from node A to node B, node A appears before node B in the ordering.
 * 
 * Topological Orderings are NOT unique.
 * Only Directed Acyclic Graphs (DAG) have a topological orderings. 
 * 
 * Real-world applications:
 *  - Program build dependencies
 *  - College class prerequisites
 *  - Event scheduling
 *  - Assembly instructions
 */
public class TopologicalSorting {
  /**
   * The intuition is to repeatedly remove nodes without any dependencies
   * from the graph and add them to the topological ordering.
   * We repeat removing nodes without dependencies from the graph
   * until all nodes are processed, or a cycle is discovered.
   * Time Complexity: O(V+E)
   * 
   * @param graph is a directed acyclic graph represented as adjacency list.
   */
  public static List<Integer> runKahnsAlgorithm(Map<Integer, List<Integer>> graph) {
    int n = graph.size();

    // Calculate the number of dependencies for every graph vertex
    int[] inDegree = new int[n];
    for (int i = 0; i < n; i++)
      for (int vertex : graph.get(i))
        inDegree[vertex]++;

    // Initialize a queue and add all vertices with no dependencies to it
    Queue<Integer> queue = new LinkedList<>();
    for (int i = 0; i < n; i++)
      if (inDegree[i] == 0)
        queue.add(i);

    List<Integer> order = new ArrayList<>();
    while (!queue.isEmpty()) {
      int vertex = queue.poll();
      order.add(vertex);
      for (int nextVertex : graph.get(vertex)) {
        // The source vertex is removed, so we can decrease
        // the dependencies counter for all the connected vertices
        inDegree[nextVertex]--;

        // If there is no any dependencies, we add it to the queue
        if (inDegree[nextVertex] == 0)
          queue.add(nextVertex);
      }
    }

    if (order.size() != n)
      return null; // graph contains a cycle

    return order;
  }

  /**
   * Using the DFS approach, we traverse the graph from every vertex as far as possible.
   * 
   * @param graph is a directed acyclic graph represented as adjacency list.
   */
  public static List<Integer> runDFS(Map<Integer, List<Integer>> graph) {
    List<Integer> order = new ArrayList<>();
    Set<Integer> visited = new HashSet<>();
    Set<Integer> path = new HashSet<>(); // used to detect cycles

    for (int i = 0; i < graph.size(); i++)
      if (!visited.contains(i))
        if (!runDFS(graph, order, visited, path, i))
          return null;

    Collections.reverse(order);
    return order;
  }

  private static boolean runDFS(Map<Integer, List<Integer>> graph, List<Integer> order, Set<Integer> visited, Set<Integer> path, int vertex) {
    path.add(vertex);
    visited.add(vertex);

    for (int nextVertex : graph.get(vertex))
      if (!visited.contains(nextVertex)) {
        if (!runDFS(graph, order, visited, path, nextVertex)) {
          return false;
        }
      } else if (path.contains(nextVertex)) {
        return false;
      }

    order.add(vertex);
    path.remove(vertex);

    return true;
  }
}
