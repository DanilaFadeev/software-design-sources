import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import * as readline from 'node:readline';
import { stdin, stdout } from 'node:process';

// InputOutput module interface used by Application class
interface IInputOutput {
  initialize(): Promise<void>;
  readLine(): Promise<string>;
  writeLine(str: string): Promise<void>;
}

// IO module implementation using Console
class ConsoleInputOutput implements IInputOutput {

  async initialize(): Promise<void> {}

  async readLine(): Promise<string> {
    const rlInterface = readline.createInterface(stdin, stdout);
    const input = await new Promise<string>(res => rlInterface.question('', res));
    rlInterface.close();

    return input;
  }

  async writeLine(str: string): Promise<void> {
    console.log(str);
  }

}

// IO module implementation using File System
class FileInputOutput implements IInputOutput {

  async initialize(): Promise<void> {
    const outputFilename = path.join(__dirname, 'output.txt');
    try {
      await fs.rm(outputFilename);
    } catch {
      // ignore
    }
  }

  async readLine(): Promise<string> {
    const filename = path.join(__dirname, 'input.txt');
    const fileContent = await fs.readFile(filename);
  
    return fileContent.toString();
  }

  async writeLine(str: string): Promise<void> {
    const filename = path.join(__dirname, 'output.txt');
    await fs.appendFile(filename, `${str}\n`);
  }
}

// Creator class containing factory method for initializing the IO module
abstract class Application {

  public async run() {
    const io = this.createInputOutput();
    await io.initialize();

    await io.writeLine('Welcome! Input your string for analyze:');

    const input = await io.readLine();
    const inputLength = this.getLength(input);

    await io.writeLine(`Your string has ${inputLength} characters.`);
  }

  private getLength(str: string): number {
    return str.length;
  }

  protected abstract createInputOutput(): IInputOutput;

}

// Extend Application logic using Console IO
class ConsoleApplication extends Application {
  protected createInputOutput(): IInputOutput {
    return new ConsoleInputOutput();
  }
}

// Extend Application logic using File System IO
class FileApplication extends Application {
  protected createInputOutput(): IInputOutput {
    return new FileInputOutput();
  }
}


(async () => {
  // The instance of Application that is using Console IO interface
  const consoleApplication = new ConsoleApplication();
  await consoleApplication.run();

  // The same Application instance, but with File IO interface
  const fileApplication = new FileApplication();
  await fileApplication.run();
})();
