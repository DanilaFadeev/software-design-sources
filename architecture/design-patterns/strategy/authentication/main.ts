import AuthenticationService from './AuthenticationService';
import { UnsecureAuthStrategy, SecureAuthStrategy } from './strategies';

const authService = new AuthenticationService();

authService.use(new UnsecureAuthStrategy());
console.log('UnsecureAuthStrategy', authService.login('jhon.doe', '123456')); // true
console.log('UnsecureAuthStrategy', authService.login('jhon.doe', '654321')); // false

authService.use(new SecureAuthStrategy('private_key'));
console.log('SecureAuthStrategy', authService.login('software.design', '123456')); // true
console.log('SecureAuthStrategy', authService.login('software.design', '654321')); // false
