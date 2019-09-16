import { Component, OnInit, Input } from '@angular/core';
import { CustomFormComponent } from 'src/app/util/custom-form-component';
import { PasswordFieldComponent } from '../password-field/password-field.component';
import { Validators, FormControl, Validator } from '@angular/forms';
import { PASSWORD_PATTERN } from 'src/app/util/password.util';

@Component({
  selector: 'app-match-password-field',
  templateUrl: './match-password-field.component.html',
  styleUrls: ['./match-password-field.component.scss', '../../app.component.scss']
})
export class MatchPasswordFieldComponent extends CustomFormComponent implements OnInit {

  @Input('password-field')
  passwordField: PasswordFieldComponent;

  matchPasswordControl: FormControl;

  private validators = new Map<string, any>();

  constructor() {
    super();
  }

  ngOnInit() {
    this.initializeValidators();
    this.bindPasswordFieldValue();
    this.initializeMatchPasswordControl();
    this.attachComponentToForm('matchPassword', this.matchPasswordControl);
  }

  private initializeValidators() {
    this.validators.set('required', Validators.required);
    this.validators.set('passwordPattern', Validators.pattern(PASSWORD_PATTERN));
  }

  private bindPasswordFieldValue() {
    this.passwordField.getPassword().subscribe((value) => {
      this.updateSamePasswordPattern(value);
      this.updateControlValidators();
    });
  }

  private updateSamePasswordPattern(newPassword: string) {
    if (!newPassword) {
      this.validators.delete('samePassword');
      return;
    }
    this.validators.set('samePassword', Validators.pattern(newPassword));
  }

  private updateControlValidators() {
    this.matchPasswordControl.setValidators(Array.from(this.validators.values()));
    this.matchPasswordControl.updateValueAndValidity();
  }

  private initializeMatchPasswordControl() {
    this.matchPasswordControl = new FormControl('', Array.from(this.validators.values()));
  }

  getErrorMessage(): string {
    if (this.matchPasswordControl.hasError('required')) {
      return 'Repeat password is required';
    }
    if (this.matchPasswordControl.hasError('pattern')) {
      return 'You need to insert the same password';
    }
    return '';
  }

}
