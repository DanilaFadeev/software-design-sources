public class KadaneAlgorithm {
  public static int maxSubArraySum(int[] arr) {
    int curSum = 0;
    int maxSum = arr[0];

    for (int num : arr) {
      curSum = Math.max(curSum, 0);      // get current positive sum or 0
      curSum += num;                     // add current number
      maxSum = Math.max(maxSum, curSum); // update max if greater
    }

    return maxSum;
  }

  public static int[] maxSubArrayPositions(int[] arr) {
    int curSum = 0, maxSum = arr[0];
    int maxL = 0, maxR = 0;

    for (int R = 0, L = 0; R < arr.length; R++) {
      if (curSum < 0) {
        curSum = 0; // reset current sum
        L = R;      // reset left pointer
      }

      curSum += arr[R];
      if (curSum > maxSum) {
        maxSum = curSum; // update max sum
        maxL = L;        // update max pointers
        maxR = R;
      }
    }

    return new int[] { maxL, maxR };
  }

  public static void main(String[] args) {
    int[] arr = new int[] { 4, -1, 2, -7, 3, 4 };
    System.out.println("Max sub-array sum: " + maxSubArraySum(arr));

    int[] pos = maxSubArrayPositions(arr);
    System.out.println("Max sub-array positions: [" + pos[0] + ", " + pos[1] + "]");
  }
}
