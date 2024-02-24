public class StackArray<T> {
  private T[] stack; // stack elements
  private int headIndex = -1; // points to the top element

  // Initialize stack with a capacity of 12
  public StackArray() {
    stack = (T[]) new Object[12];
  }

  // Initialize stack with a custom capacity
  public StackArray(int capacity) {
    if (capacity <= 0) {
      throw new RuntimeException("Capacity value is invalid");
    }
    stack = (T[]) new Object[capacity];
  }

  // Insert a new element onto the stack
  public void push(T value) {
    if (headIndex >= stack.length - 1) {
      throw new IndexOutOfBoundsException("The stack is full");
    }
    stack[++headIndex] = value;
  }

  // Retrieve the top element and delete it
  public T pop() {
    if (isEmpty()) return null;

    T value = stack[headIndex];
    stack[headIndex--] = null;
    return value;
  }

  // Retrieve the top element without deleting it
  public T peek() {
    if (isEmpty()) return null;
    return stack[headIndex];
  }

  // Check stack emptiness
  public boolean isEmpty() {
    return headIndex == -1;
  }

  // Get the size of the stack
  public int size() {
    return headIndex + 1;
  }
}
