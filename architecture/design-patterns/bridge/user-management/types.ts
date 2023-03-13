export type User = Record<string, any> & {
  id: string;
  username: string;
  password: string;
  createdAt: Date;
};

export interface IUserService {
  register(username: string, password: string): string;
  authenticate(username: string, password: string): null | string;
  getById(id: string): User;
  updateById(id: string, data: User): boolean;
}
