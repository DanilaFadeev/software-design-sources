package algorithms;

import org.junit.Test;
import static org.junit.Assert.*;

public class BucketSortTest {
    @Test()
    public void sort() {
        // Arrange
        double[] elements = new double[] {
            0.78,
            0.17,
            0.39,
            0.26,
            0.72,
            0.94,
            0.21,
            0.12,
            0.23,
            0.68
        };

        // Act
        BucketSort.sort(elements);

        // Assert
        assertArrayEquals(new double[] {
            0.12,
            0.17,
            0.21,
            0.23,
            0.26,
            0.39,
            0.68,
            0.72,
            0.78,
            0.94
        }, elements, 0.01);
    }
}
