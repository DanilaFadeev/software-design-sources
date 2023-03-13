import UserManagement from './UserManagement'; // Abstraction

import InMemoryUserService from './InMemoryUserService'; // Implementation 1
import FileUserService from './FileUserService'; // Implementation 2

const USERNAME = 'software';
const PASSWORD = 'design';

/**
 * UserManagement abstraction using InMemoryUserService implementation
 * where users are stored in memory
 */
const inMemoryUserService = new InMemoryUserService();
const memoryUserManagement = new UserManagement(inMemoryUserService);

memoryUserManagement.register(USERNAME, PASSWORD);
memoryUserManagement.updateDetails(USERNAME, PASSWORD, { tags: ['test'] });

const user1 = memoryUserManagement.getCurrentUser(USERNAME, PASSWORD);
console.log('In-memory user:', user1);


/**
 * UserManagement abstraction using FileUserService implementation
 * where users are stored in JSON file on disk
 */
const fileUserService = new FileUserService();
const fileUserManagement = new UserManagement(fileUserService);

fileUserManagement.register(USERNAME, PASSWORD);
fileUserManagement.updateDetails(USERNAME, PASSWORD, { tags: ['test'] });

const user2 = memoryUserManagement.getCurrentUser(USERNAME, PASSWORD);
console.log('User from file:', user2);
