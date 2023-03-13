import * as crypto from 'node:crypto';
import type { User, IUserService } from './types';

class InMemoryUserService implements IUserService {

  private usersMap = new Map<string, User>();

  public register(username: string, password: string): string {
    const id = crypto.randomBytes(16).toString('hex');
    const user = { id, username, password, createdAt: new Date() };

    this.usersMap.set(id, user);

    return id;
  }

  public authenticate(username: string, password: string): string {
    for (const [userId, user] of this.usersMap) {
      if (user.username === username && user.password === password) {
        return userId;
      }
    }
    return null;
  }

  public getById(userId: string): User {
    return this.usersMap.get(userId);
  }

  public updateById(id: string, data: User): boolean {
    if (!this.usersMap.has(id)) {
      return false;
    }

    this.usersMap.set(id, data);
    return true;
  }
}

export default InMemoryUserService;
