interface ISubscriber {
  handle(event: Object): void;
}

class Publisher {
  private subscribers: ISubscriber[] = [];

  public subscribe(subscriber: ISubscriber): void {
    this.subscribers.push(subscriber);
  }

  public unsubscribe(subscriber: ISubscriber): void {
    this.subscribers = this.subscribers.filter(s => s!== subscriber);
  }

  public notify(event: Object): void {
    for (const subscriber of this.subscribers) {
      subscriber.handle(event);
    }
  }
}

class ConcreteSubscriber1 implements ISubscriber {
  public handle(event: Object): void {
    console.log('Subscriber1 received an event:', JSON.stringify(event));
  }
}

class ConcreteSubscriber2 implements ISubscriber {
  public handle(event: Object): void {
    console.log('Subscriber2 received an event:', JSON.stringify(event));
  }
}

const publisher = new Publisher();

const subscriber1 = new ConcreteSubscriber1();
publisher.subscribe(subscriber1); 

const subscriber2 = new ConcreteSubscriber2();
publisher.subscribe(subscriber2);

publisher.notify({ message: 'Some updates!' });

publisher.unsubscribe(subscriber1);
publisher.notify({ message: 'More updates!' });
