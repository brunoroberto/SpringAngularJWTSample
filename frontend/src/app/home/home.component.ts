import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../security/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../app.component.scss']
})
export class HomeComponent implements OnInit {

  username = '';
  authorities = [];

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.username = this.tokenStorage.getUsername();
    this.authorities = this.tokenStorage.getAuthorities();
  }

}
