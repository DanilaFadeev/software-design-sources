import { EventEmitter } from 'node:events';

class Subscriber1 {
  public static onUpdate(...args): void {
    console.log('Subscriber1: Update event captured', args);
  }
}

class Subscriber2 {
  public static onUpdate(...args): void {
    console.log('Subscriber2: Update event captured', args)
  }
}

const eventEmitter = new EventEmitter();
eventEmitter.addListener('update', Subscriber1.onUpdate);
eventEmitter.addListener('update', Subscriber2.onUpdate);

eventEmitter.emit('update', 'Calculated PI value', Math.PI);
// Subscriber1: Update event captured: [ 'Calculated PI value', 3.141592653589793 ]
// Subscriber2: Update event captured [ 'Calculated PI value', 3.141592653589793 ]

eventEmitter.removeListener('update', Subscriber1.onUpdate);
eventEmitter.emit('update', 'Calculated E value', Math.E);
// Subscriber2: Update event captured [ 'Calculated E value', 2.718281828459045 ]
