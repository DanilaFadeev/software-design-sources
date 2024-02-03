public class DynamicArray<E> {
  private E[] array;
  private int activeIndex = 0;

  public DynamicArray(int initialCapacity) {
    array = (E[]) new Object[initialCapacity];
  }

  public void push(E item) {
    array[activeIndex++] = item;
    if (activeIndex >= array.length) {
      resize(array.length * 2);
    }
  }

  public E pop() {
    E item = array[--activeIndex];

    if (activeIndex <= array.length / 4) {
      resize(array.length / 2);
    }

    return item;
  }

  public int getCapacity() {
    return this.array.length;
  }

  private void resize(int capacity) {
    E[] doubleArray = (E[]) new Object[capacity];

    for (int i = 0; i < activeIndex; i++) {
      doubleArray[i] = array[i];
    }

    array = doubleArray;
  }
}
