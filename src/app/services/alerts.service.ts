import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Alert } from '../components/alert-board/alert-board.component';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  subject: Subject<Alert> = new Subject<Alert>();

  constructor() { }

  getAlerts(): Observable<Alert> {
    return this.subject;
  }

  newAlert(alert: Alert) {
    this.subject.next(alert);
  }

}
