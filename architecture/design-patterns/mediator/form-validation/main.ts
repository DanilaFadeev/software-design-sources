import Form from './Form';
import { TextInput, SubmitButton, ResetButton } from './components';

// Initialize the form
const loginForm = new Form();

// Add components to the form
const usernameInput = new TextInput('UsernameInput', loginForm);
const passwordInput = new TextInput('PasswordInput', loginForm);
const submitBtn = new SubmitButton('SubmitButton', loginForm);
const resetBtn = new ResetButton('ResetButton', loginForm);

/*
 * Do some actions below
 */

usernameInput.setValue('jhon.doe@example.com');
// UsernameInput value changed to "jhon.doe@example.com"

passwordInput.setValue('12345');
// PasswordInput value changed to "12345"
// SubmitButton became visible

resetBtn.click();
// ResetButton button was clicked
// UsernameInput value changed to "null"
// SubmitButton became hidden
// PasswordInput value changed to "null"
