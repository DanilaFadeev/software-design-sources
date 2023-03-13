import CsvProcessor from './CsvProcessor';
import Adapter from './Adapter';

/**
 * We have a list of addresses in a standard JSON format:
 */
const addresses = [
  { name: 'Jhon', lastname: 'Doe', address: '120 jefferson st.', town: 'Riverside', state: 'NJ' },
  { name: 'Jack', lastname: 'McGinnis', address: '220 hobo Av.', town: 'Phila', state: 'PA' },
];

/**
 * Option 1. We can work directly with the CSVProcessor using additional conversion logic
 */
const csvProcessor = new CsvProcessor();
csvProcessor.setHeader(Object.keys(addresses[0]));

for (const address of addresses) {
  csvProcessor.addRow(Object.values(address));
}

const csvSource = csvProcessor.getSource();
console.log('Addresses CSV data:\n', csvSource);

/**
 * Option 2. We can use the Adapter that familiar with the used JSON format
 */
const adapter = new Adapter();
adapter.setData(addresses);
const csvRecords = adapter.getSource();
console.log('Addressed JSON data:\n', csvRecords);
