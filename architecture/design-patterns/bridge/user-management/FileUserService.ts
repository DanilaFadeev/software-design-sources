import * as fs from 'node:fs';
import * as crypto from 'node:crypto';
import type { IUserService, User } from './types';

class FileUserService implements IUserService {

  static filepath = './users.json';

  constructor() {
    if (!fs.existsSync(FileUserService.filepath)) {
      fs.writeFileSync(FileUserService.filepath, '[]');
    }
  }

  get users(): User[] {
    const content = fs.readFileSync(FileUserService.filepath).toString();
    return JSON.parse(content);
  }

  set users(users: User[]) {
    const content = JSON.stringify(users, null, 2);
    fs.writeFileSync(FileUserService.filepath, content);
  }

  public register(username: string, password: string): string {
    const id = crypto.randomBytes(16).toString('hex');
    const user = { id, username, password, createdAt: new Date() };

    this.users = [...this.users, user];

    return id;
  }

  public authenticate(username: string, password: string): string {
    for (const user of this.users) {
      if (user.username === username && user.password === password) {
        return user.id;
      }
    }
    return null;
  }

  public getById(id: string): User {
    return this.users.find(user => user.id === id);
  }

  public updateById(id: string, data: User): boolean {
    this.users = this.users.map(user => user.id === id ? data : user);
    return true;
  }

}

export default FileUserService;
