import * as Warehouse from './Warehouse';
import ItemCompositor from './ItemCompositor';

// prints string in red
const red = (str: string) => '\x1B[31m' +  str + '\x1b[0m';

// prints the warehouse hierarchy to console
const printTree = (component: Warehouse.Item | ItemCompositor<any>, indentSize = 0): void => {
  const indent = ' '.repeat(indentSize);
  const title = red(component.toString());

  // display the current item details
  console.log(`${indent}${title}: ${component.getPrice()}$, ${component.getWeight()}g`);

  // iterate over nested components if the current item is a Compositor
  if (component instanceof ItemCompositor) {
    for (const item of component.getItems()) {
      printTree(item, indentSize + 2)
    }
  }
}

/**
 * Warehouse hierarchy:
 * [Space] -> [Shelf] -> [Bin] -> [Item]
 */

// root warehouse space
const space = new Warehouse.Space('1 Purvis Dr, Gore Bay, Canada');

// warehouse space shelves
const shelf1 = new Warehouse.Shelf(10001);
const shelf2 = new Warehouse.Shelf(10002);
space.addItems([shelf1, shelf2]);

// warehouse shelves bins
const bin1 = new Warehouse.Bin('WHB1-1');
const bin2 = new Warehouse.Bin('WHB1-2');
shelf1.addItems([bin1, bin2]);

const bin3 = new Warehouse.Bin('WHB2-1');
const bin4 = new Warehouse.Bin('WHB2-2');
shelf2.addItems([bin3, bin4]);

// put items into bins
const item1 = new Warehouse.Item('ABC123', 10.98, 200, new Date('2023-03-07T10:45:00.000Z'));
const item2 = new Warehouse.Item('ABC345', 7.05, 170, new Date('2023-03-07T10:50:00.000Z'));
bin1.addItems([item1, item2]);

const item3 = new Warehouse.Item('ABC567', 0.98, 580, new Date('2023-03-01T10:45:00.000Z'));
const item4 = new Warehouse.Item('ABC789', 12.99, 1100, new Date('2023-02-20T19:30:00.000Z'));
bin2.addItems([item3, item4]);

const item5 = new Warehouse.Item('ABC912', 80.50, 750, new Date('2023-03-03T12:00:00.000Z'));
bin3.addItems(item5);

const item6 = new Warehouse.Item('ABC234', 22.99, 450, new Date('2023-03-05T06:55:00.000Z'));
bin4.addItems(item6);

// print the warehouse tree from the root Space compositor
printTree(space);
