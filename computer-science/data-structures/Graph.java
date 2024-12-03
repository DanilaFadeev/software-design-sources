import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;
import java.util.LinkedList;
import java.util.List;

public class Graph {
  private final int V;
  private int E;
  private List<Integer> adj[];

  public Graph(int V) {
    this.V = V;

    adj = (LinkedList<Integer>[]) new LinkedList[V];
    for (int v = 0; v < V; v++)
      adj[v] = new LinkedList<>();
  }

  public void addEdge(int v, int w) {
    adj[v].add(w);
    adj[w].add(v);
    E += 2;
  }

  public int V() {
    return V;
  }

  public Iterable<Integer> adj(int v) {
    return adj[v];
  }

  public int degree(int v) {
    return adj[v].size();
  }

  public int maxDegree() {
    int max = 0;
    for (int v = 0; v < V; v++)
      max = Math.max(max, degree(v));

    return max;
  }

  public double averageDegree() {
    return 2.0 * E * V;
  }

  public static void depthFirstPaths(Graph graph) {
    int[] edgeTo = new int[graph.V()];
    Arrays.fill(edgeTo, -1);

    boolean[] visited = new boolean[graph.V()];

    dfs(graph, 0, visited, edgeTo);
  }

  private static void dfs(Graph graph, int v, boolean[] visited, int[] edgeTo) {
    visited[v] = true;
    for (int w : graph.adj(v)) {
      if (!visited[w]) {
        edgeTo[w] = v;
        dfs(graph, w, visited, edgeTo);
      }
    }
  }

  public static void bfs(Graph graph) {
    int[] edgeTo = new int[graph.V()];
    Arrays.fill(edgeTo, -1);
  
    boolean[] visited = new boolean[graph.V()];
    visited[0] = true;

    Deque<Integer> queue = new ArrayDeque<>(graph.V());
    queue.add(0);

    while (!queue.isEmpty()) {
      int v = queue.poll();
      for (int w : graph.adj(v)) {
        if (!visited[w]) {
          visited[w] = true;
          edgeTo[w] = v;
          queue.add(w);
        }
      }
    }
  }
}
