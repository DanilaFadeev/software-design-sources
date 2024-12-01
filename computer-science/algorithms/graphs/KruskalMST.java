package algorithms.graphs;

import java.util.ArrayList;
import java.util.List;
import java.util.PriorityQueue;

public class KruskalMST {
  private static class UnionFind {
    int[] arr;

    public UnionFind(int size) {
      arr = new int[size];
      for (int i = 0; i < size; i++) arr[i] = i;
    }

    public boolean union(int p, int q) {
      int root1 = find(p), root2 = find(q);
      if (root1 == root2) return false;

      arr[root1] = root2;
      return true;
    }

    private int find(int p) {
      while (arr[p] != p) p = arr[p];
      return p;
    }
  }

  /**
   * Calculates the total weight (cost) of the graph's MST.
   * 
   * @param edges The list of graph's edges
   * @param size The total number of nodes in the graph
   * @return The Minimum Spanning Tree total cost
   */
  public static int getMSTCost(int[][] edges, int size) {
    UnionFind uf = new UnionFind(size);
    int totalCost = 0, edgesLeft = size - 1;

    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[2] - b[2]);
    for (int[] edge: edges) pq.add(edge);

    while (!pq.isEmpty() && edgesLeft > 0) {
      int[] edge = pq.poll();
      if (uf.union(edge[0], edge[1])) {
        totalCost += edge[2];
        edgesLeft--;
      }
    }

    if (edgesLeft > 0) {
      return -1; // No MST exists
    }
    
    return totalCost;
  }

  /**
   * Calculates the graph's MST, which is a subset of the edges in the graph which connects
   * all vertices together (without creating any cycles) while minimizing the total edge cost.
   * 
   * @param edges The list of graph's edges
   * @param size The total number of nodes in the graph
   * @return The Minimum Spanning Tree total cost
   */
  public static List<int[]> getMSTEdges(int[][] edges, int size) {
    UnionFind uf = new UnionFind(size);
    List<int[]> mstEdges = new ArrayList<>();

    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[2] - b[2]);
    for (int[] edge: edges) pq.add(edge);

    while (!pq.isEmpty() && mstEdges.size() < size - 1) {
      int[] edge = pq.poll();
      if (uf.union(edge[0], edge[1])) {
        mstEdges.add(edge);
      }
    }

    if (mstEdges.size() < size - 1) {
      return null; // No MST exists
    }
    
    return mstEdges;
  }
}
