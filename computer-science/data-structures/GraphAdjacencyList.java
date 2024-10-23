import java.util.*;

public class GraphAdjacencyList {
  Map<String, List<String>> adjList;

  public GraphAdjacencyList(String[][] edges) {
    build(edges);
  }

  public Map<String, List<String>> build(String[][] edges) {
    adjList = new HashMap<>();
  
    for (String[] edge : edges) {
      String source = edge[0];
      String target = edge[1];

      adjList.computeIfAbsent(source, k -> new ArrayList<>()).add(target);
      adjList.computeIfAbsent(target, k -> new ArrayList<>()).add(source);
    }

    return adjList;
  }

  // Find shortest path from start to target
  public int bfsShortestPath(String start, String target) {
    Deque<String> queue = new ArrayDeque<>();
    queue.add(start);

    Set<String> visited = new HashSet<>();
    visited.add(start);

    int length = 0;
    while (!queue.isEmpty()) {
      int queueSize = queue.size();
      for (int i = 0; i < queueSize; i++) {
        String node = queue.poll();
        if (node == target) return length;

        for (String neighbour : adjList.get(node))
          if (!visited.contains(neighbour)) {
            queue.add(neighbour);
            visited.add(node);
          }
      }
      length++;
    }

    return length;
  }

  // Count unique paths (backtracking)
  public int dfsCountPaths(String node, String target, Set<String> visited) {
    if (visited.contains(node)) {
      return 0; // skip already visited
    }
    if (node == target) {
      return 1; // match the target - path is found
    }

    int count = 0; // paths count from the current node
    visited.add(node); // mark node as visited

    for (String next : adjList.get(node)) {
      // add paths count from every node neighbour
      count += dfsCountPaths(next, target, visited); 
    }

    visited.remove(node);

    return count;
  }
}
