import { IForm, IFormComponent, Visibility } from './types';
import { SubmitButton } from './components';

class Form implements IForm {

  private components: IFormComponent[] = [];

  private submitBtn: IFormComponent;

  constructor(private state: Record<string, any> = {}) {}

  public addComponent(component: IFormComponent): void {
    if (component instanceof SubmitButton) {
      this.submitBtn = component;
    } else {
      this.components.push(component);
    }
  }

  public setField(key: string, value: any): void {
    this.state[key] = value;
    this.validateState();
  }

  public reset(): void {
    for (const component of this.components) {
      component.setValue(null);
    }
  }

  private validateState(): void {
    const isInvalid = this.components.some(component => !component.isValid());

    // Hide or display form submit button
    const visibility = isInvalid ? Visibility.Hidden : Visibility.Visible;
    this.submitBtn.setVisibility(visibility);
  }
}

export default Form;
