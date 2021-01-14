import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'ol';
import { SubscriptionManager } from 'src/app/classes/subscription-manager';
import { Utils } from 'src/app/classes/utils';
import { AlertsService } from 'src/app/services/alerts.service';

export enum AlertType {
  success = 'success',
  info = 'info',
  warning = 'warning',
  danger = 'danger',
  primary = 'primary',
  secondary = 'secondary',
  light = 'light',
  dark = 'dark'
};

export interface Alert {
  type: AlertType
  message: string;
  timeout?: number;
}

@Component({
  selector: 'app-alert-board',
  templateUrl: './alert-board.component.html',
  styleUrls: ['./alert-board.component.scss']
})
export class AlertBoardComponent implements OnInit, OnDestroy {

  alerts: Alert[] = new Array<Alert>();
  sm = new SubscriptionManager();

  constructor(
    private alertsService: AlertsService
  ) { }

  ngOnInit(): void {
    this.sm.addSubscription(this.alertsService.getAlerts().subscribe( (alert) => this.showAlert(alert) ));
  }

  showAlert(alert: Alert) {
    this.alerts.push(alert);

    setTimeout( () => {
      this.alerts = this.alerts.filter( (a) => a != alert );
    }, alert.timeout ? alert.timeout : Utils.alertStandardTimeout);
  }

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  ngOnDestroy(): void {
    this.sm.removeAllSubscriptions();
  }

}
