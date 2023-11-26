import java.lang.Comparable;

class Array<T extends Comparable<T>> {
  private T[] items; // reference to an array
  private int length;  // number of data items

  public Array(int max) {
    items = (T[]) new Comparable[max]; // create the array
    length = 0;                        // no items yet
  }

  public int getSize() {
    return length;
  }

  public boolean exists(T target) {
    for (int i = 0; i < length; i++) {
      if (items[i].equals(target)) {
        return true;
      }
    }
    return false;
  }

  public int findIndex(T target) {
    for (int i = 0; i < length; i++) {
      if (items[i].equals(target)) {
        return i;
      }
    }
    return -1;
  }

  public void insert(T value) {
    items[length++] = value;
  }

  public boolean delete(T value) {
    int i;
    for (i = 0; i < length; i++) {
      if (items[i].equals(value)) {
        break;
      }
    }
    if (i == length) {
      return false;
    }
    for (int j = i; j < length; j++) {
      items[j] = items[j + 1];
    }
    length--;
    return true;
  }

  public T getMax() {
    if (length == 0) {
      return null;
    }

    T maxItem = items[0];
    for (int i = 1; i < length; i++) {
      if (items[i].compareTo(maxItem) > 0) {
        maxItem = items[i];
      }
    }

    return maxItem;
  }

  public String toString() {
    StringBuilder stringBuilder = new StringBuilder("[");

    for (int i = 0; i < length; i++) {
      stringBuilder.append(items[i] + (i < length - 1 ? ", " : ""));
    }

    stringBuilder.append("]");
    return stringBuilder.toString();
  }
}
