import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CustomFormComponent } from 'src/app/util/custom-form-component';
import { Observable } from 'rxjs';
import { PASSWORD_PATTERN } from 'src/app/util/password.util';

@Component({
  selector: 'app-password-field',
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.scss', '../../app.component.scss']
})
export class PasswordFieldComponent extends CustomFormComponent implements OnInit {

  @Input('password-strength')
  passwordStrength?: boolean;

  @Input('show-hint')
  showHint: boolean = true;

  passwordControl: FormControl;
  private validators = [];

  constructor() {
    super();
  }

  ngOnInit() {
    this.initializeValidators();
    this.initializePasswordControl();
    this.attachComponentToForm('password', this.passwordControl);
  }

  private initializeValidators() {
    this.validators.push(Validators.required);
    this.validators.push(Validators.maxLength(20));
    if (this.passwordStrength) {
      this.validators.push(Validators.pattern(PASSWORD_PATTERN));
    }
  }

  private initializePasswordControl() {
    this.passwordControl = new FormControl('', this.validators);
  }

  getErrorMessage(): string {
    if (this.passwordControl.hasError('required')) {
      return 'Password is required';
    }
    if (this.passwordControl.hasError('maxlength')) {
      const maxlengthError = this.passwordControl.getError('maxlength');
      return `Your password is too big. Maximum of ${maxlengthError.requiredLength} characters.`;
    }
    if (this.passwordStrength && this.passwordControl.hasError('pattern')) {
      return 'Your password must have at least 8 digits. Remember to use lower case, upper case and numbers';
    }
    return '';
  }

  getPassword(): Observable<any> {
    return this.passwordControl.valueChanges
  }

}
