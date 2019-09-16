import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-button',
  templateUrl: './sign-up-button.component.html',
  styleUrls: ['./sign-up-button.component.scss']
})
export class SignUpButtonComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onClick() {
    this.router.navigateByUrl('/sign-up');
  }
}
