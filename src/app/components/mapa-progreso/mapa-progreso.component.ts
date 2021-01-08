import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SubscriptionManager } from 'src/app/classes/subscription-manager';
import { Utils } from 'src/app/classes/utils';
import { Pico } from 'src/app/state/pico.model';
import { PicosQuery } from 'src/app/state/picos.query';
import { PicosService } from 'src/app/state/picos.service';

@Component({
  selector: 'app-mapa-progreso',
  templateUrl: './mapa-progreso.component.html',
  styleUrls: ['./mapa-progreso.component.scss']
})
export class MapaProgresoComponent implements OnInit, OnDestroy {
  picos$: Observable<Pico[]> = new Observable();
  totalAscendidos = 0;
  readonly totalTechos = Utils.totalTechos;
  subs: SubscriptionManager = new SubscriptionManager();

  constructor(
    private picosQuery: PicosQuery,
    private picosService: PicosService   
  ) {  }

  ngOnInit(): void {    
    this.picos$ = this.picosQuery.selectAll();
    this.subs.addSubscription(this.picosQuery.getTotalAscendidos().subscribe( resp => this.totalAscendidos = resp.length ));
  }

  toggleAscendido(pico: Pico) {
    this.picosService.toggleAscendido(pico);
  }

  ngOnDestroy() {
    this.subs.removeAllSubscriptions();
  }
}
