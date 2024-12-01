import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;
import java.util.Set;

public class PrimMST {
  /**
   * Calculates the total weight (cost) of the graph's MST.
   * 
   * @param graph The graph represented as an adjacency list.
   * @return The Minimum Spanning Tree total cost
   */
  public static int getMSTCost(Map<Integer, List<int[]>> graph) {
    int N = graph.size();

    PriorityQueue<int[]> minPq = new PriorityQueue<>((a, b) -> a[1] - b[1]);
    minPq.add(new int[] { 0, 0 }); // (vertex, weight)

    Set<Integer> visited = new HashSet<>();

    int totalCost = 0;
    while (!minPq.isEmpty() && visited.size() < N) {
      int[] record = minPq.poll();
      int vertex = record[0], weight = record[1];

      if (visited.contains(vertex)) continue;

      visited.add(vertex);
      totalCost += weight;

      for (int[] next : graph.get(vertex)) {
        if (!visited.contains(next[0])) {
          minPq.add(next);
        }
      }
    }

    if (visited.size() != N) {
      return -1; // No MST exists
    }
    
    return totalCost;
  }

  /**
   * Calculates the graph's MST, which is a subset of the edges in the graph which connects
   * all vertices together (without creating any cycles) while minimizing the total edge cost.
   * 
   * @param graph The graph represented as an adjacency list.
   * @return The Minimum Spanning Tree edges list
   */
  public static List<int[]> getMSTEdges(Map<Integer, List<int[]>> graph, int startNode) {
    int N = graph.size();

    // Initialize the heap by choosing the startNode and pushing all its neighbors.
    PriorityQueue<int[]> minPq = new PriorityQueue<>((a, b) -> Integer.compare(a[2], b[2]));
    for (int[] next : graph.get(startNode)) {
      minPq.add(new int[] { startNode, next[0], next[1] }); // (from, to, weight)
    }

    Set<Integer> visited = new HashSet<>();
    visited.add(startNode);

    List<int[]> mstEdges = new ArrayList<>();

    while (!minPq.isEmpty() && visited.size() < N) {
      int[] record = minPq.poll();
      int from = record[0], to = record[1], weight = record[2];

      if (visited.contains(to)) continue;

      visited.add(to);
      mstEdges.add(new int[] { from, to, weight });

      for (int[] next : graph.get(to)) {
        if (!visited.contains(next[0])) {
          minPq.add(new int[] { to, next[0], next[1] });
        }
      }
    }

    if (visited.size() != N) {
      return null; // No MST exists
    }

    return mstEdges;
  }
}