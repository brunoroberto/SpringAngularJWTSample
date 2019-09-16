import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cancel-button',
  templateUrl: './cancel-button.component.html',
  styleUrls: ['./cancel-button.component.scss']
})
export class CancelButtonComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onClick() {
    this.router.navigateByUrl('/sign-in');
  }

}
