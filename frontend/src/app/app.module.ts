import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NameFieldComponent } from './sign-up/name-field/name-field.component';
import { EmailFieldComponent } from './sign-up/email-field/email-field.component';
import { UsernameFieldComponent } from './sign-up/username-field/username-field.component';
import { PasswordFieldComponent } from './sign-up/password-field/password-field.component';
import { MatchPasswordFieldComponent } from './sign-up/match-password-field/match-password-field.component';
import { PasswordStrengthComponent } from './sign-up/password-strength/password-strength.component';
import { CreateButtonComponent } from './sign-up/create-button/create-button.component';
import { CancelButtonComponent } from './sign-up/cancel-button/cancel-button.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { EnterButtonComponent } from './sign-in/enter-button/enter-button.component';
import { SignUpButtonComponent } from './sign-in/sign-up-button/sign-up-button.component';
import { UserService } from './user/user.service';
import { MessageAlertComponent } from './message-alert/message-alert.component';
import { TokenStorageService } from './security/token-storage.service';
import { HomeComponent } from './home/home.component';
import { SignOutButtonComponent } from './home/sign-out-button/sign-out-button.component';
import { SecurityGuard } from './security/security-guard';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    NameFieldComponent,
    EmailFieldComponent,
    UsernameFieldComponent,
    PasswordFieldComponent,
    MatchPasswordFieldComponent,
    PasswordStrengthComponent,
    CreateButtonComponent,
    CancelButtonComponent,
    SignInComponent,
    EnterButtonComponent,
    SignUpButtonComponent,
    MessageAlertComponent,
    HomeComponent,
    SignOutButtonComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  providers: [SecurityGuard, UserService, TokenStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
