package algorithms.strings;

public class KeyIndexedCounting {

  private final static int R = 26; // total number of letters

  /*
   * Sorts an array of lowercase English characters.
   * 
   * Time Complexity: O(N + R)
   * Space Complexity: O(N + R)
   */
  public static void sort(char[] characters) {
    int[] count = new int[R + 1];

    // count frequencies of each letter using key as index
    for (char c : characters)
      count[c - 'a' + 1]++;

    // compute frequency cumulates which specify destinations
    for (int i = 1; i <= R; i++)
      count[i] += count[i - 1];

    // access cumulates using key as index to move items
    char[] buffer = new char[characters.length];
    for (char c : characters)
      buffer[count[c - 'a']++] = c;

    // copy back into original array
    for (int i = 0; i < buffer.length; i++)
      characters[i] = buffer[i];
  }
}
