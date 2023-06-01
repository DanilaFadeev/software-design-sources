export type User = {
  username: string;
  password: string;
};

export interface IAuthStrategy {
  verify(username: string, password: string, users: User[]): boolean;
}
