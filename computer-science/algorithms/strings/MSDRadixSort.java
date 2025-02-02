package algorithms.strings;

/**
 * MSD (Most Significant Digit First) string (radix) sort.
 *
 * MSD radix sort is a non-comparative sorting algorithm that processes the most
 * significant digit first and recursively sorts the substrings. It is suitable for
 * applications where the input strings have a uniform length and the character set
 * is relatively small.
 */
public class MSDRadixSort {
  private static final int R = 256; // Radix (alphabet size)

  public static void sort(String[] strings) {
    String[] buffer = new String[strings.length];
    sort(strings, buffer, 0, strings.length - 1, 0);
  }

  private static void sort(String[] strings, String[] buffer, int l, int r, int p) {
    if (l >= r) return;

    /*
     * Key-indexed counting
     */
    int[] count = new int[R + 2];
    for (int i = l; i <= r; i++)
      count[charAt(strings[i], p) + 2]++;
    
    for (int i = 1; i <= R; i++)
      count[i] += count[i - 1];

    for (int i = l; i <= r; i++)
      buffer[l + count[charAt(strings[i], p) + 1]++] = strings[i];

    for (int i = l; i <= r; i++)
      strings[i] = buffer[i];

    /*
     * Sort R sub-arrays recursively
     */
    for (int i = 1; i < R; i++)
      sort(strings, buffer, count[i - 1], count[i] - 1, p + 1);
  }

  // Returns p-th string character or -1 for EOL
  private static int charAt(String string, int p) {
    if (p < string.length()) return string.charAt(p);
    return -1;
  }
}
