package algorithms.strings;

/**
 * Multi-key quicksort is a variant of quicksort that partitions the array based on
 * the characters at a specific position in the strings. It recursively sorts the
 * substrings, making it suitable for applications where the input strings have varying
 * lengths and characters.
 */
public class MultiKeyQuicksort {
  /**
   * Sorts an array of strings using the multi-key quicksort algorithm.
   * @param strings the array of strings to be sorted
   */
  public static void sort(String[] strings) {
    sort(strings, 0, strings.length - 1, 0);
  }

  /**
   * Recursively sorts the array of strings using multi-key quicksort.
   *
   * @param strings the array of strings to be sorted
   * @param l the left index of the subarray to be sorted
   * @param r the right index of the subarray to be sorted
   * @param p the character position (key) to be used for sorting
   */
  private static void sort(String[] strings, int l, int r, int p) {
    if (l >= r) return;

    int pivot = charAt(strings[l], p);
    int lt = l, gt = r;
    int i = l + 1;

    // Perform quicksort partitioning
    while (i <= gt) {
      int t = charAt(strings[i], p);
      if (t > pivot) swap(strings, i, gt--);
      else if (t < pivot) swap(strings, lt++, i++);
      else i++;
    }

    // Sort substrings recursively
    sort(strings, l, lt - 1, p);
    if (pivot > 0) sort(strings, lt, gt, p + 1);
    sort(strings, gt + 1, r, p);
  }

  // Returns p-th string character or -1 for EOL
  private static int charAt(String string, int p) {
    if (p < string.length()) return string.charAt(p);
    return -1;
  }

  // Swaps two strings at positions i and j
  private static void swap(String[] strings, int i, int j) {
    String buffer = strings[i];
    strings[i] = strings[j];
    strings[j] = buffer; 
  }
}
