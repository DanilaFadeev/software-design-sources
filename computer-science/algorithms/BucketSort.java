import java.util.Vector;
import java.util.Collections;

public class BucketSort {
  public static void sort(double[] elements) {
    int n = elements.length;

    // 1. Initialize n empty buckets
    @SuppressWarnings("unchecked")
    Vector<Double>[] buckets = new Vector[n];
    for (int i = 0; i < n; i++)
      buckets[i] = new Vector<Double>();

    // 2. Distribute elements among the buckets
    for (double element : elements) {
      int bucketIndex = (int) (element * n);
      buckets[bucketIndex].add(element);
    }

    // 3. Sort individual buckets
    for (Vector<Double> vector : buckets) {
      Collections.sort(vector);
    }

    // 4. Gather bucket elements
    for (int i = 0, j = 0; i < n; i++) {
      for (Double element : buckets[i]) {
        elements[j++] = element;
      }
    }
  }
}
