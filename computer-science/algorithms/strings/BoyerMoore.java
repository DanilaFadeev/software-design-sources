package algorithms.strings;

import java.util.Arrays;

/**
 * Case 1. Mismatch character 'T' not in pattern:
 * increment i one character beyond 'T'.
 *
 * . . . . . . . T L E . . . . . .
 *         N E E D L E
 *               ^ mismatch (T)
 * 
 * . . . . . . . T L E . . . . . .
 *                 N E E D L E
 */
/**
 * Case 2a. Mismatch character 'N' in pattern:
 * align text 'N' with rightmost pattern 'N'
 *
 * . . . . . . . N L E . . . . . .
 *         N E E D L E
 *               ^ mismatch (N)
 * 
 * . . . . . . . N L E . . . . . .
 *               N E E D L E
 */
/**
 * Case 2b. Mismatch character 'E' in pattern:
 * increment i by 1
 *
 * . . . . . . . E L E . . . . . .
 *         N E E D L E
 *               ^ mismatch (E)
 * 
 * . . . . . . . E L E . . . . . .
 *         N E E D L E
 */

public class BoyerMoore {
  private static int R = 256; // alphabet size

  // Precompute index of rightmost occurrence of each character in pattern.
  // Return -1 if character not in pattern.
  private static int[] precompute(String pattern) {
    int[] right = new int[R];
    Arrays.fill(right, -1);

    for (int i = 0; i < pattern.length(); i++)
      right[pattern.charAt(i)] = i;

    return right;
  }

  public static int search(String str, String pattern) {
    int N = str.length(), M = pattern.length();
    int[] right = precompute(pattern);

    for (int i = 0, skip = 0; i <= N - M; i++) {
      skip = 0;

      for (int j = M - 1; j >= 0; j--)
        if (pattern.charAt(j) != str.charAt(i + j)) {
          skip = Math.max(1, j - right[str.charAt(i + j)]);
          break;
        }

      if (skip == 0) return i;
    }

    return -1;
  }
}
