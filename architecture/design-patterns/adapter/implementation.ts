/* Client works with strings */
type ClientInput = string;
type ClientOutput = string;

interface IClient {
  method(input: ClientInput): ClientOutput;
}

/* Service works with numbers */
type ServiceInput = number;
type ServiceOutput = number;

class Service {
  public method(input: ServiceInput): ServiceOutput {
    return input ** 2;
  }
}

class Adapter implements IClient {

  private service = new Service();

  public method(input: ClientInput): ClientInput {
    const serviceInput = this.convertInput(input);
    const serviceOutput = this.service.method(serviceInput);
    const clientOutput = this.convertOutput(serviceOutput);

    return clientOutput;
  }

  private convertInput(input: ClientInput): ServiceInput {
    return Number.parseInt(input, 10);
  }

  private convertOutput(output: ServiceOutput): ClientInput {
    return output.toString();
  }
}

const adapter = new Adapter();
const result = adapter.method('64'); // call service method with a string argument
console.log(`Result: ${result}(${typeof result})`);
