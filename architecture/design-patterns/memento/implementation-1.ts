class Originator {
  private state: Object = {};

  public setState(state: Object) {
    this.state = { ...state };
  }

  public save(): Memento {
    return new Memento(this.state);
  }

  public restore(memento: Memento): void {
    this.state = { ...memento.getState() };
  }
}

class Memento<T = Object> {
  constructor(private state: T) {}

  public getState(): T {
    return this.state;
  }
}

class Caretaker {
  private history: Memento[] = [];

  constructor(private originator: Originator) {}

  public backup() {
    const memento = this.originator.save();
    this.history.push(memento);
  }

  public undo() {
    const memento = this.history.pop();
    this.originator.restore(memento);
  }
}

const originator = new Originator();
const caretaker = new Caretaker(originator);

originator.setState({ name: 'Initial' }); // set initial state
caretaker.backup(); // make a snapshot

originator.setState({ name: 'Modified' }); // update the state
console.log(originator); // Originator { state: { name: 'Modified' } }

caretaker.undo(); // revert the latest change
console.log(originator); // Originator { state: { name: 'Initial' } }
