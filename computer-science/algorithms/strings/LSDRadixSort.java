package algorithms.strings;

/**
 * LSD (Least Significant Digit First) string (radix) sort.
 * LSD sorts fixed-length strings in ascending order.
 * 
 * Sort algorithm:
 *   - Consider characters from right to left.
 *   - Stable sort using i-th character as the key (using key-indexed counting).
 */
public class LSDRadixSort {
  private final static int R = 256; // radix

  public static void sort(String[] strings) {
    int N = strings.length;
    int W = getCommonLength(strings);

    String[] buffer = new String[N];

    for (int i = W - 1; i >= 0; i--) {
      int[] count = new int[R + 1];

      for (int j = 0; j < N; j++)
        count[strings[j].charAt(i) + 1]++;

      for (int j = 1; j <= R; j++)
        count[j] += count[j - 1];

      for (int j = 0; j < N; j++)
        buffer[count[strings[j].charAt(i)]++] = strings[j];

      for (int j = 0; j < N; j++)
        strings[j] = buffer[j];
    }
  }

  private static int getCommonLength(String[] strings) {
    if (strings.length == 0) return 0;

    int length = strings[0].length();
    for (String s : strings)
      if (s.length() != length)
        throw new IllegalArgumentException("All strings must be the same length");

    return length;
  }
}
