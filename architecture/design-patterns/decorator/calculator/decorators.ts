import type { ICalculator } from './calculator';

class CalculatorBaseDecorator implements ICalculator {
  constructor(private calculator: ICalculator) {}

  public sum(a: number, b: number): number {
    return this.calculator.sum(a, b);
  }

  public subtract(a: number, b: number): number {
    return this.calculator.subtract(a, b);
  }
}

/**
 * Decorator that formats calculator results
 * by fixing the fraction digits
 */
class Format extends CalculatorBaseDecorator {
  constructor(calculator: ICalculator, private digits: number) {
    super(calculator);
  }

  public sum(a: number, b: number): number {
    const original = super.sum(a, b);
    return this.format(original);
  }

  public subtract(a: number, b: number): number {
    const original = super.subtract(a, b);
    return this.format(original);
  }

  private format(num: number): number {
    return +num.toFixed(this.digits);
  }
}

type ConvertConfig = {
  from: 'mm' | 'cm' | 'm' | 'km';
  to: 'mm' | 'cm' | 'm' | 'km';
};

/**
 * Decorator that converts calculator results
 * from one distance measurement unit to another
 */
class Convert extends CalculatorBaseDecorator {
  constructor(calculator: ICalculator, private config: ConvertConfig) {
    super(calculator);
  }

  public sum(a: number, b: number): number {
    const original = super.sum(a, b);
    return this.convert(original);
  }

  public subtract(a: number, b: number): number {
    const original = super.subtract(a, b);
    return this.convert(original);
  }

  private convert(num: number): number {
    const { from, to } = this.config;
    const milliliters = { 'mm': 1, 'cm': 10, 'm': 1E3, 'km': 1E6 };

    return num * milliliters[from] / milliliters[to];
  }
}

export { Format, Convert };
