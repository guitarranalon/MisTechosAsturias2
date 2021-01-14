import { Component, OnInit } from '@angular/core';
import { SubscriptionManager } from 'src/app/classes/subscription-manager';
import { Utils } from 'src/app/classes/utils';
import { AlertsService } from 'src/app/services/alerts.service';
import { Pico } from 'src/app/state/pico.model';
import { PicosQuery } from 'src/app/state/picos.query';
import { AlertBoardComponent, AlertType } from '../alert-board/alert-board.component';

@Component({
  selector: 'app-pico-mas-cercano',
  templateUrl: './pico-mas-cercano.component.html',
  styleUrls: ['./pico-mas-cercano.component.scss']
})
export class PicoMasCercanoComponent implements OnInit {
  noAscendidos: Pico[];
  subs: SubscriptionManager = new SubscriptionManager();
  geolocation: boolean;
  coords: any;
  closestPeak: Pico | undefined;
  distanceToClosestPeak: number;

  constructor(
    private picosQuery: PicosQuery,
    private alertsService: AlertsService
  ) { }

  ngOnInit(): void {
    this.geolocation = 'geolocation' in navigator;
    this.subs.addSubscription(this.picosQuery.getNoAscendidos().subscribe(resp => this.noAscendidos = resp));
  }

  ngOnDestroy() {
    this.subs.removeAllSubscriptions();
  }

  buscarTechoMasCercano() {
    navigator.geolocation.getCurrentPosition(
      (position: any) => {
      this.coords = position.coords;

      this.searchClosestPeak();
    },
    (err: any) => { 
      console.log(err);
      this.alertsService.newAlert({type: AlertType.danger, message: 'Se ha producido un error al intentar obtener tu posición'});
    }, 
    {
      timeout: Utils.getCurrentPositionTimeout
    });
  }

  private searchClosestPeak() {
    if (this.noAscendidos && this.noAscendidos.length) {
      for (const pico of this.noAscendidos) {
        const distancia = Utils.calcDistance(this.coords.latitude, this.coords.longitude, pico.latitud, pico.longitud);

        if (!this.closestPeak || distancia < this.distanceToClosestPeak) {
          this.closestPeak = pico;
          this.distanceToClosestPeak = distancia;
        }
      }

      // Finalmente se redonde la distancia para mejorar la presentación en UI
      this.distanceToClosestPeak = Math.round(this.distanceToClosestPeak);
    }
  }
}
