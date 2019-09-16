import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageType, Message } from '../message-alert/message.model';
import { Credential } from '../model/credential.model';
import { UserService } from '../user/user.service';
import { MessageAlertComponent } from '../message-alert/message-alert.component';
import { JwtResponse } from '../model/jwt-response.model';
import { TokenStorageService } from '../security/token-storage.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss', '../app.component.scss']
})
export class SignInComponent implements OnInit {

  @ViewChild('messageAlert', { static: true })
  messageAlert: MessageAlertComponent;

  signInForm: FormGroup;

  message = new Message(MessageType.SUCCESS, 'Account successfully created');

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private userService: UserService,
    private tokenStorage: TokenStorageService) {
  }

  ngOnInit() {
    this.getQueryParams();
    this.initializeSignInForm();
  }

  private getQueryParams() {
    this.activatedRoute.queryParams
      .subscribe(params => {
        if (params.created) {
          this.messageAlert.show();
        }
      });
  }

  private initializeSignInForm() {
    this.signInForm = new FormGroup({});
  }

  private createCredentialFromForm(): Credential {
    return new Credential(
      this.signInForm.get('username').value,
      this.signInForm.get('password').value
    );
  }

  public signIn() {
    const cred = this.createCredentialFromForm();
    this.userService.authenticate(cred)
      .then((data: JwtResponse) => {
        this.saveJwtResponse(data);
        this.navigateToHome();
      })
      .catch(error => this.handleError(error));
  }

  private saveJwtResponse(jwt: JwtResponse) {
    this.tokenStorage.saveToken(jwt.accessToken);
    this.tokenStorage.saveUsername(jwt.username);
    this.tokenStorage.saveAuthorities(jwt.authorities);
  }

  private navigateToHome() {
    this.router.navigateByUrl('/home');
  }

  private handleError(error?) {
    console.error(`Sorry, something happened :( ${error}`);
    this.message = new Message(MessageType.ERROR, 'Could not authenticate the user');
    this.messageAlert.show();
  }

}
