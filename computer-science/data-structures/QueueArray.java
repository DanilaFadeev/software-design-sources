public class QueueArray<T> {
  private T[] queue;
  private int front = -1; 
  private int rear = -1; 
  
  public QueueArray() {
    this.queue = (T[]) new Object[12];
  }

  public QueueArray(int capacity) {
    this.queue = (T[]) new Object[capacity];
  }

  public void enqueue(T value) {
    if (isFull()) return;

    queue[++rear] = value;
    if (front == -1) front++;
  }

  public T dequeue() {
    if (isEmpty()) {
      return null;
    }
    if (front == rear) {
      T value = queue[front];
      front = rear = -1;
      return value;
    }
    return queue[front++];
  }

  public int size() {
    if (isEmpty()) return 0;
    return rear - front + 1;
  }

  public boolean isEmpty() {
    return front == -1 && rear == -1;
  }

  public boolean isFull() {
    return rear >= (queue.length - 1);
  }
}
