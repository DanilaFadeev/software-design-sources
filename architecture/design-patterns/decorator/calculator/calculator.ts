export interface ICalculator {
  sum(a: number, b: number): number;
  subtract(a: number, b: number): number;
}

class Calculator implements ICalculator {
  public sum(a: number, b: number): number {
    return a + b;
  }

  public subtract(a: number, b: number): number {
    return a - b;
  }
}

export default Calculator;
