package algorithms.strings;

import java.util.Arrays;

class LongestRepeatedSubstring {
  // Given a string of N characters, finds the longest repeated substring
  public static String find(String s) {
    int N = s.length();

    // Create suffixes (linear time and space)
    String[] suffix = new String[N];
    for (int i = 0; i < N; i++)
      suffix[i] = s.substring(i);

    // Sort suffixes
    Arrays.sort(suffix);

    // Find LCP between adjacent suffixes in sorted order
    String longest = "";
    for (int i = 0; i < N - 1; i++) {
      int len = lcp(suffix[i], suffix[i + 1]);
      if (len > longest.length())
        longest = suffix[i].substring(0, len);
    }

    return longest;
  }

  // Returns the length of the longest common prefix of two strings
  private static int lcp(String a, String b) {
    int N = Math.min(a.length(), b.length()), l = 0;
    while (l < N && a.charAt(l) == b.charAt(l)) l++;
    return l;
  }
}
