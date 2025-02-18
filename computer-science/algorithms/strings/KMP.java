package algorithms.strings;

/**
 * Knuth–Morris–Pratt substring search
 */
public class KMP {

  private static int R = 256; // alphabet size

  private static int[][] buildDFA(String pattern) {
    int M = pattern.length();

    int[][] dfa = new int[R][M];
    dfa[pattern.charAt(0)][0] = 1;

    for (int X = 0, j = 1; j < M; j++) {
      for (int ch = 0; ch < R; ch++)
        dfa[ch][j] = dfa[ch][X]; // copy missmatch cases

      dfa[pattern.charAt(j)][j] = j + 1; // set match case
      X = dfa[pattern.charAt(j)][X]; // update restart state
    }

    return dfa;
  }

  public static int search(String text, String pattern) {
    int[][] dfa = buildDFA(pattern);
    int N = text.length(), M = pattern.length();

    for (int i = 0, j = 0; i < N; i++) {
      j = dfa[text.charAt(i)][j];
      if (j == M) return i - j + 1;
    }

    return -1;
  }
}
