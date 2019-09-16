import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-button',
  templateUrl: './create-button.component.html',
  styleUrls: ['./create-button.component.scss']
})
export class CreateButtonComponent implements OnInit {

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
