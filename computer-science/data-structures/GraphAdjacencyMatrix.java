import java.util.*;

public class GraphAdjacencyMatrix {
  private int[][] matrix;
  private Map<String, Integer> vertexToIndex;
  private Map<Integer, String> indexToVertex;

  public GraphAdjacencyMatrix(String[][] edges) {
    build(edges);
  }

  public void build(String[][] edges) {
    vertexToIndex = new HashMap<>();
    indexToVertex = new HashMap<>();

    // Collect Vertices
    for (String[] edge : edges) {
      addVertex(edge[0]);
      addVertex(edge[1]);
    }

    // Initialize adjacency matrix
    int size = vertexToIndex.size();
    matrix = new int[size][size];

    // Fill adjacency matrix with edges
    for (String[] edge : edges) {
      int v1 = vertexToIndex.get(edge[0]);
      int v2 = vertexToIndex.get(edge[1]);

      matrix[v1][v2] = 1;
      matrix[v2][v1] = 1;
    }
  }

  // Time Complexity: O(N^2)
  public List<String> bfsTraversal(String startVertex) {
    List<String> path = new ArrayList<>();

    boolean[] visited = new boolean[matrix.length];
    visited[vertexToIndex.get(startVertex)] = true;

    Deque<Integer> queue = new ArrayDeque<>();
    queue.add(vertexToIndex.get(startVertex));

    while (!queue.isEmpty()) {
      Integer i = queue.poll();
      path.add(indexToVertex.get(i));

      for (int j = 0; j < matrix.length; j++) {
        if (matrix[i][j] != 0 && !visited[j]) {
          queue.add(j);
          visited[j] = true;
        }
      }
    }

    return path;
  }

  public boolean bfsIfPathExists(String from, String to) {
    boolean[] visited = new boolean[matrix.length];
    visited[vertexToIndex.get(from)] = true;

    Deque<Integer> queue = new ArrayDeque<>();
    queue.add(vertexToIndex.get(from));

    while (!queue.isEmpty()) {
      Integer i = queue.poll();
      if (vertexToIndex.get(to) == i) return true;

      for (int j = 0; j < matrix.length; j++) {
        if (matrix[i][j] != 0 && !visited[j]) {
          queue.add(j);
          visited[j] = true;
        }
      }
    }

    return false;
  }

  private void addVertex(String vertex) {
    if (vertexToIndex.containsKey(vertex)) return;

    vertexToIndex.put(vertex, vertexToIndex.size());
    indexToVertex.put(indexToVertex.size(), vertex);
  }

  @Override
  public String toString() {
    return Arrays.deepToString(matrix);
  }
}
