import { ShippingService } from './ShippingService';

const shippingService = new ShippingService();

// State #1: Shipment Created
console.log(`Current Status: ${shippingService.getStatus()}`);  // Current Status: Created
shippingService.changeAddress('Warsaw, Poland');                // Delivery address set: Warsaw, Poland
shippingService.proceed();                                      // Shipment moved to another status

console.log('\n');

// State #2: Shipment Dispatched
console.log(`Current Status: ${shippingService.getStatus()}`);  // Current Status: Dispatched
shippingService.changeAddress('Will not work');                 // ERR: Can't change the address of a dispatched shipment!
shippingService.proceed();                                      // Shipment moved to another status

console.log('\n');

// State #4: Shipment Delivered
console.log(`Current Status: ${shippingService.getStatus()}`);  // Current Status: Delivered
shippingService.changeAddress('Will not work');                 // ERR: Can't change the address of a delivered shipment!
shippingService.proceed();                                      // ERR: The shipment is already delivered
