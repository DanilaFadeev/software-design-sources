import { TrimHandler, CapitalizeHandler, RepeatHeader } from './TextHandlers';

// Initialize handler
const trimHandler = new TrimHandler();
const capitalizeHandler = new CapitalizeHandler();
const repeatHeader = new RepeatHeader(3);

// Connect the handlers into a chain
trimHandler.setNext(capitalizeHandler);
capitalizeHandler.setNext(repeatHeader);

// Pass the request through the different chain handlers
const input = 'HeLlO  ';
console.log(`Input text: "${input}"`);
console.log('Repeat(3): ' + repeatHeader.handle(input));
console.log('Capitalize -> Repeat(3): ' + capitalizeHandler.handle(input));
console.log('Trim -> Capitalize -> Repeat(3): ' + trimHandler.handle(input));

/*
Input text: "HeLlO  "
Repeat(3): HeLlO  HeLlO  HeLlO  
Capitalize -> Repeat(3): Hello  Hello  Hello  
Trim -> Capitalize -> Repeat(3): HelloHelloHello
*/
