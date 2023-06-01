import type { User, IAuthStrategy } from './types';

const usersDump: User[] = [{
  username: 'jhon.doe',
  password: '123456'
}, {
  username: 'software.design',
  password: '3mLnsZgYPzpI9Hc1/YIvUJF41VTag2b12asjEo9nLeU='
}];

export default class AuthenticationService {

  private users: User[] = usersDump;

  constructor(private authStrategy?: IAuthStrategy) {}

  public use(strategy: IAuthStrategy): void {
    this.authStrategy = strategy;
  }

  public login(username: string, password: string): boolean {
    return this.authStrategy?.verify(username, password, this.users);
  }

}