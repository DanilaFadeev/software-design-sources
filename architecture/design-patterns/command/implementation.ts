class Receiver {
  public operation(...params): void {
    console.log('Receiver operation called with', params);
  }
}

interface ICommand {
  execute(): void;
}

class ConcreteCommand implements ICommand {
  constructor(
    private receiver: Receiver,
    private params: any
  ) {}

  public execute(): void {
    this.receiver.operation(this.params);
  }
}

class Invoker {
  private command: ICommand;

  public register(command: ICommand): void {
    this.command = command;
  }

  public execute(): void {
    this.command?.execute();
  }
}

const receiver = new Receiver();
const invoker = new Invoker();

const command = new ConcreteCommand(receiver, ['arg1', 'arg2']);
invoker.register(command);
invoker.execute();
