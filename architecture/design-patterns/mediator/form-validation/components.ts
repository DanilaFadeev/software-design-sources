import FormComponent from './FormComponent';
import { Visibility } from './types';

export class CommonButton extends FormComponent<never> {
  public click(): void {
    console.log(`${this.name} button was clicked`);
  }

  public isValid(): boolean {
    return true;
  }
}

export class ResetButton extends CommonButton {
  public click(): void {
    super.click();
    this.form.reset();
  }
}

export class SubmitButton extends CommonButton {
  // hide submit by default
  protected visible: Visibility = Visibility.Hidden;
}

export class TextInput extends FormComponent<string> {}
