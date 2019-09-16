import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserService } from '../user/user.service';
import { SignUpForm } from '../model/user.model';
import { Message, MessageType } from '../message-alert/message.model';
import { Router } from '@angular/router';
import { MessageAlertComponent } from '../message-alert/message-alert.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss', '../app.component.scss']
})
export class SignUpComponent implements OnInit {

  @ViewChild('messageAlert', { static: true })
  messageAlert: MessageAlertComponent;

  signUpForm: FormGroup;

  message: Message;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.initializeSignUpForm();
  }

  private initializeSignUpForm() {
    this.signUpForm = new FormGroup({});
  }

  private getSignUpFormData(): SignUpForm {
    return new SignUpForm(
      this.signUpForm.get('name').value,
      this.signUpForm.get('email').value,
      this.signUpForm.get('username').value,
      this.signUpForm.get('password').value
    );
  }

  create() {
    const signUpForm = this.getSignUpFormData();
    this.userService.createAccount(signUpForm)
      .then(message => {
        this.navigateToLoginPage();
      })
      .catch(error => this.handleError(error));
  }

  private handleError(errorObj) {
    this.message = new Message(MessageType.ERROR, errorObj.error.message);
    this.messageAlert.show();
  }

  private navigateToLoginPage() {
    this.router.navigate(['/sign-in'], { queryParams: { created: true } });
  }


}
