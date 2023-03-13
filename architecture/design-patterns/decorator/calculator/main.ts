import Calculator from './calculator';
import { Format, Convert } from './decorators';

const calculator = new Calculator();
const formattedCalculator = new Format(calculator, 3);
const convertedCalculator = new Convert(formattedCalculator, { from: 'm', to: 'cm' });

const originalSum = calculator.sum(Math.PI, Math.E);
const formattedSum = formattedCalculator.sum(Math.PI, Math.E);
const convertedSum = convertedCalculator.sum(Math.PI, Math.E);

console.log(`Original: ${originalSum}, Formatted: ${formattedSum}m (${convertedSum}cm)`);
// Original: 5.859874482048838, Formatted: 5.86m (586cm)

const originalSub = calculator.subtract(Math.PI, Math.E);
const formattedSub = formattedCalculator.subtract(Math.PI, Math.E);
const convertedSub = convertedCalculator.subtract(Math.PI, Math.E);

console.log(`Original: ${originalSub}, Formatted: ${formattedSub}m (${convertedSub}cm)`);
// Original: 0.423310825130748, Formatted: 0.423m (42.3cm)
