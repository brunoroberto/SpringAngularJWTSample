import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-enter-button',
  templateUrl: './enter-button.component.html',
  styleUrls: ['./enter-button.component.scss']
})
export class EnterButtonComponent implements OnInit {

  @Input('form')
  form: FormGroup;

  @Output()
  action = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    this.action.emit();
  }

}
