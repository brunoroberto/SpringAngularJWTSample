import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { CustomFormComponent } from 'src/app/util/custom-form-component';

@Component({
  selector: 'app-name-field',
  templateUrl: './name-field.component.html',
  styleUrls: ['./name-field.component.scss', '../../app.component.scss']
})
export class NameFieldComponent extends CustomFormComponent implements OnInit {

  nameControl: FormControl;

  constructor() {
    super();
  }

  ngOnInit() {
    this.initializeNameControl();
    this.attachComponentToForm('name', this.nameControl);
  }

  private initializeNameControl() {
    this.nameControl = new FormControl('', [ Validators.required, Validators.maxLength(100) ]);
  }

  getErrorMessage() {
    if (this.nameControl.hasError('required')) {
      return 'Name is required';
    }
    if (this.nameControl.hasError('maxlength')) {
      const maxlengthError = this.nameControl.getError('maxlength');
      return `Your name is too big. Maximum of ${maxlengthError.requiredLength} characters.`;
    }
    return '';
  }

}
