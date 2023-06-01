export enum Status {
  Valid = 'valid',
  Invalid = 'invalid'
}

export enum Visibility {
  Visible = 'visible',
  Hidden = 'hidden'
}

export interface IFormComponent {
  setVisibility(visibility: Visibility): void;
  setValue(value: any): void;
  isValid(): boolean;
}

export interface IForm {
  addComponent(component: IFormComponent): void;
  setField(key: string, value: any): void;
  reset(): void;
}
