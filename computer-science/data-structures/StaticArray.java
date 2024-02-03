public class StaticArray<E> {
  private E[] array; // reference to an array
  private int length = 0; // number of real data items

  public StaticArray(int size) {
    array = (E[]) new Object[size];
  }

  public E get(int index) {
    if (!isCorrectIndex(index)) {
      throw new IndexOutOfBoundsException(index);
    }
    return array[index];
  }

  public void insert(E value) {
    if (isFull()) {
      throw new IndexOutOfBoundsException("The underlying array is full");
    }
    array[length++] = value;
  }

  public void insert(E value, int index) {
    if (!isCorrectIndex(index)) {
      throw new IndexOutOfBoundsException(index);
    }
    if (isFull()) {
      throw new IndexOutOfBoundsException("The underlying array is full");
    }

    for (int i = length; i > index; i--) {
      array[i] = array[i - 1];
    }

    array[index] = value;
    length++;
  }

  public void remove(int index) {
    if (!isCorrectIndex(index)) {
      throw new IndexOutOfBoundsException(index);
    }

    for (int i = index; i < length - 1; i++) {
      array[i] = array[i + 1];
    }

    array[--length] = null;
  }

  public int getIndex(E value) {
    for (int i = 0; i < length; i++) {
      if (value == array[i]) {
        return i;
      }
    }
    return -1;
  }

  public boolean exists(E value) {
    return getIndex(value) != -1;
  }

  public int getLength() {
    return length;
  }

  public boolean isFull() {
    return length >= array.length;
  }

  public boolean isCorrectIndex(int index) {
    return index >= 0 && index < array.length;
  }

  public String toString() {
    String output = "[";

    for (int i = 0; i < length; i++) {
      output += array[i].toString();
      if (i < length - 1) {
        output += ", ";
      }
    }

    return output + "]";
  }
}
