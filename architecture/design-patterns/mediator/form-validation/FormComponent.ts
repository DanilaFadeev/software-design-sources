import { IForm, IFormComponent, Visibility } from './types';

abstract class FormComponent<T> implements IFormComponent {

  protected value: T = null;

  protected visible: Visibility = Visibility.Visible;

  constructor(protected name: string, protected form: IForm) {
    form.addComponent(this);
  }

  public setValue(value: T): void {
    this.value = value;
    console.log(`${this.name} value changed to "${this.value}"`);

    this.form.setField(this.name, value);
  }

  public setVisibility(visibility: Visibility): void {
    if (this.visible === visibility) return;

    this.visible = visibility;
    console.log(`${this.name} became ${this.visible}`);
  }

  public isValid(): boolean {
    return !!this.value;
  }
}

export default FormComponent;
