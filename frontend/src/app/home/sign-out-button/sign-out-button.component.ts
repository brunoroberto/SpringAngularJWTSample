import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/security/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-out-button',
  templateUrl: './sign-out-button.component.html',
  styleUrls: ['./sign-out-button.component.scss']
})
export class SignOutButtonComponent implements OnInit {

  constructor(private router: Router, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
  }

  signOut() {
    this.tokenStorage.signOut();
    this.router.navigateByUrl('/sign-in');
  }
}
