public class ConnectedComponents {
  private int[] id; // id[v] is ID of component containing v
  private boolean visited[];
  private int count = 0; // number of connected components

  public ConnectedComponents(Graph graph) {
    id = new int[graph.V()];
    visited = new boolean[graph.V()];

    for (int v = 0; v < graph.V(); v++) {
      if (!visited[v]) {
        dfs(graph, v);
        count++;
      }
    }
  }

  private void dfs(Graph graph, int v) {
    id[v] = count;
    visited[v] = true;

    for (int w : graph.adj(v))
      if (!visited[w])
        dfs(graph, w);
  }

  // total number of components
  public int getCount() {
    return count;
  }

  // ID of component containing v
  public int getId(int v) {
    return id[v];
  }

  public boolean isConnected(int v, int w) {
    return id[v] == id[w];
  }
}
