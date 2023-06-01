import { createHmac } from 'node:crypto';
import type { IAuthStrategy, User } from './types'

export class UnsecureAuthStrategy implements IAuthStrategy {
  public verify(username: string, password: string, users: User[]): boolean {
    const user = users.find(
      user => user.username === username && user.password === password
    );
    return !!user;
  }
}

export class SecureAuthStrategy implements IAuthStrategy {

  constructor(
    private secret: string,
    private algorithm: string = 'sha256'
  ) {}

  public verify(username: string, password: string, users: User[]): boolean {
    const user = users.find(user => user.username === username);
    if (!user) return false;

    const hmac = createHmac(this.algorithm, this.secret).update(password);
    const hashedPassword = hmac.digest('base64');

    return user.password === hashedPassword;
  }
}
