export interface ICommand {
  execute(): void;
}

export type KeyPressHandler = {
  key: string;
  ctrl: boolean;
  command: ICommand; 
};
