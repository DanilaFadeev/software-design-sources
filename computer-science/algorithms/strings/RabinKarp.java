package algorithms.strings;

// The algorithm is based on the concept of hashing.
public class RabinKarp {
  private static int R = 256; // alphabet size
  private static int Q = (int) 1e4 + 9; // prime number modulo

  // The Monte Carlo version always runs in linear time but can return the wrong answer.
  public static int search(String str, String pattern) {
    int N = str.length(), M = pattern.length();
    long hash = hash(str, M);
    long patHash = hash(pattern, M);

    if (hash == patHash) return 0;

    long RM = 1;
    for (int i = 1; i < M; i++)
      RM = (R * RM) % Q;

    for (int i = M; i < N; i++) {
      hash = (hash + Q - RM * str.charAt(i - M) % Q) % Q;
      hash = (hash * R + str.charAt(i)) % Q;

      // In Las Vegas we also should check for substring match if hash match.
      // The Las Vegas version always returns the correct answer but takes time proportional to M*N in the worst case.
      if (hash == patHash) return i - M + 1;
    }

    return -1;
  }

  // Compute a hash of pattern characters 0 to M-1
  public static long hash(String key, int M) {
    long hash = 0;
    for (int i = 0; i < M; i++)
      hash = (hash * R + key.charAt(i)) % Q;
    return hash;
  }
}
