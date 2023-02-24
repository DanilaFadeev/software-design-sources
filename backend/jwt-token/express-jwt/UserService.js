const usersSeed = [{
  id: 1,
  username: 'jhon.doe',
  firstName: 'Jhon',
  lastName: 'Doe',
  email: 'jhon.doe@email.com',
  refreshToken: null
}];

export default class UserService {

  constructor() {
    this.users = this.#initializeUsers();
  }

  #initializeUsers() {
    const userEntries = usersSeed.map(user => [user.id, user]);
    return new Map(userEntries);
  }

  getById(userId) {
    return this.users.get(userId);
  }

  updateById(userId, payload) {
    const user = this.users.get(userId);

    const updatedUser = { ...user, ...payload };
    this.users.set(userId, updatedUser);

    return updatedUser;
  }

}