import { Component, OnInit, Input } from '@angular/core';
import { PASSWORD_PATTERN_LOWECASE, PASSWORD_PATTERN_UPPERCASE, PASSWORD_PATTERN_NUMBER, PASSWORD_PATTERN_MIN_8_CHARS } from 'src/app/util/password.util';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.scss']
})
export class PasswordStrengthComponent implements OnInit {

  @Input('password-field')
  passwordField: FormControl;

  readonly SECURITY_LEVELS = 4;

  invalidLevelsCount = 0;
  levelElements = [];

  levelStates = [
    { 'elements': 4, 'state': 'good' }, // 0 invalid levels
    { 'elements': 3, 'state': 'weak' }, // 1 invalid levels
    { 'elements': 2, 'state': 'bad' }, // 2 invalid levels
    { 'elements': 1, 'state': 'bad' }, // 3 invalid levels
    { 'elements': 0, 'state': '' } // 4 invalid levels
  ];

  constructor() { }

  ngOnInit() {
    this.resetLevelElements();
    this.watchPasswordChanges();
  }

  private resetLevelElements() {
    this.levelElements = [];
    for (let i = 0; i < this.SECURITY_LEVELS; i++) {
      this.levelElements.push({ clazz: '' });
    }
  }

  private watchPasswordChanges() {
    this.passwordField.valueChanges.subscribe(
      (value) => {
        this.validatePassword(value);
      }
    );
  }

  private resetInvalidLevelsCount() {
    this.invalidLevelsCount = this.SECURITY_LEVELS;
  }

  private validatePassword(newPassword: string) {
    try {
      this.resetInvalidLevelsCount();

      const hasLowerCase = PASSWORD_PATTERN_LOWECASE.test(newPassword);
      const hasUpperCase = PASSWORD_PATTERN_UPPERCASE.test(newPassword);
      const hasNumber = PASSWORD_PATTERN_NUMBER.test(newPassword);
      const hasMin8Chars = PASSWORD_PATTERN_MIN_8_CHARS.test(newPassword);

      if (hasLowerCase) { this.invalidLevelsCount--; }
      if (hasUpperCase) { this.invalidLevelsCount--; }
      if (hasNumber) { this.invalidLevelsCount--; }
      if (hasMin8Chars) { this.invalidLevelsCount--; }

      this.updateLevelElements();

    } catch (e) {
      console.error(`Could not validate the new password - ${e}`);
    }
  }

  private updateLevelElements() {
    this.resetLevelElements();
    const lvlState = this.levelStates[this.invalidLevelsCount];
    if (lvlState) {
      for (let i = 0; i < lvlState.elements; i++) {
        this.levelElements[i].clazz = lvlState.state;
      }
    }
  }

}
