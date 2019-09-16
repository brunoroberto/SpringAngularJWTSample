import { Component, OnInit, Input } from '@angular/core';
import { Message, MessageType } from './message.model';
import { timeout } from 'q';

@Component({
  selector: 'app-message-alert',
  templateUrl: './message-alert.component.html',
  styleUrls: ['./message-alert.component.scss']
})
export class MessageAlertComponent implements OnInit {

  @Input('message')
  message: Message;

  _show: boolean = false;

  readonly DEFAULT_TIMEOUT_IN_SECONDS = 4;

  constructor() { }

  ngOnInit() {
  }

  private dismissMessage(timeoutInMiliseconds: number) {
    setTimeout(() => {
      this.hide();
    }, timeoutInMiliseconds);
  }

  getClassByType(type: MessageType) {
    if (type === MessageType.SUCCESS) { return 'success'; }
    return 'error';
  }

  show(timeoutInSeconds?: number) {
    this._show = true;
    if (!timeoutInSeconds) {
      timeoutInSeconds = this.DEFAULT_TIMEOUT_IN_SECONDS;
    }
    this.dismissMessage(1000 * timeoutInSeconds);
  }

  hide() {
    this._show = false;
  }


}
