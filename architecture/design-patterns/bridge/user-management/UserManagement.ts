import type { User, IUserService } from './types';

export default class UserManagement {
  
  constructor(private userService: IUserService) {}

  public register(username: string, password: string): boolean {
    this.userService.register(username, password);
    return true;
  }

  public getCurrentUser(username: string, password: string): User {
    const userId = this.userService.authenticate(username, password);
    const user = this.userService.getById(userId);

    return user;
  }

  public updateDetails(username: string, password: string, data: Partial<User>): User {
    const userId = this.userService.authenticate(username, password);
    const user = this.userService.getById(userId);

    const update = { ...user, ...data };
    this.userService.updateById(user.id, update);

    return this.userService.getById(user.id);
  }

}
