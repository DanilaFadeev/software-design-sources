interface Memento {
  restore(): void;
}

interface Originator {
  save(): Memento;
}

class ConcreteOriginator implements Originator {
  private state: Object;

  public save(): Memento {
    return new ConcreteMemento(this, this.state);
  }

  public setState(state: Object) {
    this.state = { ...state };
  }
}

class ConcreteMemento implements Memento {
  constructor(
    private originator: ConcreteOriginator,
    private state: Object
  ) {}

  public restore(): void {
    this.originator.setState(this.state);
  }
}

class Caretaker {
  constructor(
    private originator: Originator,
    private history: Memento[] = []
  ) {}

  public backup() {
    const memento = this.originator.save();
    this.history.push(memento);
  }

  public undo(): void {
    const memento = this.history.pop();
    memento.restore();
  }
}

const originator = new ConcreteOriginator();
const caretaker = new Caretaker(originator);

originator.setState({ name: 'Initial' }); // set initial state
caretaker.backup(); // make a snapshot

originator.setState({ name: 'Modified' }); // update the state
console.log(originator); // ConcreteOriginator { state: { name: 'Modified' } }

caretaker.undo(); // revert the latest change
console.log(originator); // ConcreteOriginator { state: { name: 'Initial' } }
