import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { CustomFormComponent } from 'src/app/util/custom-form-component';

@Component({
  selector: 'app-email-field',
  templateUrl: './email-field.component.html',
  styleUrls: ['./email-field.component.scss', '../../app.component.scss']
})
export class EmailFieldComponent extends CustomFormComponent implements OnInit {

  emailControl: FormControl;

  constructor() {
    super();
  }

  ngOnInit() {
    this.initializeEmailControl();
    this.attachComponentToForm('email', this.emailControl);
  }

  private initializeEmailControl() {
    this.emailControl = new FormControl('', [Validators.required, Validators.maxLength(100), Validators.email]);
  }

  getErrorMessage() {
    if (this.emailControl.hasError('required')) {
      return 'Email is required';
    }
    if (this.emailControl.hasError('email')) {
      return 'A valid email is required';
    }
    if (this.emailControl.hasError('maxlength')) {
      const maxlengthError = this.emailControl.getError('maxlength');
      return `Your email is too big. Maximum of ${maxlengthError.requiredLength} characters.`;
    }
    return '';
  }

}
