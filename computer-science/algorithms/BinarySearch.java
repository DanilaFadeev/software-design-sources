class BinarySearch {

  static public int find(Comparable[] arr, Object target) {
    int lowerBound = 0;
    int upperBound = arr.length - 1;

    while (lowerBound <= upperBound) {
      int middle = Math.round((upperBound + lowerBound) / 2);

      if (arr[middle].equals(target)) {
        return middle;
      } else if (arr[middle].compareTo(target) > 0) {
        upperBound = middle - 1;
      } else if (arr[middle].compareTo(target) < 0) {
        lowerBound = middle + 1;
      }
    }

    return -1;
  }

}
