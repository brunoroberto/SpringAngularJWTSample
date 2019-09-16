import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CustomFormComponent } from 'src/app/util/custom-form-component';

@Component({
  selector: 'app-username-field',
  templateUrl: './username-field.component.html',
  styleUrls: ['./username-field.component.scss', '../../app.component.scss']
})
export class UsernameFieldComponent extends CustomFormComponent implements OnInit {

  @Input('show-hint')
  showHint: boolean = true;
  
  usernameControl: FormControl;

  constructor() {
    super();
  }

  ngOnInit() {
    this.initializeUsernameControl();
    this.attachComponentToForm('username', this.usernameControl);
  }

  private initializeUsernameControl() {
    this.usernameControl = new FormControl('', [Validators.required, Validators.maxLength(20)]);
  }

  getErrorMessage() {
    if (this.usernameControl.hasError('required')) {
      return 'Username is required';
    }
    if (this.usernameControl.hasError('maxlength')) {
      const maxlengthError = this.usernameControl.getError('maxlength');
      return `Your username is too big. Maximum of ${maxlengthError.requiredLength} characters.`;
    }
    return '';
  }

}
