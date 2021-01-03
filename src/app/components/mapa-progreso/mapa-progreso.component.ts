import { Component, OnInit } from '@angular/core';
import { utils } from 'protractor';
import { Observable } from 'rxjs';
import { Utils } from 'src/app/classes/utils';
import { Pico } from 'src/app/state/pico.model';
import { PicosQuery } from 'src/app/state/picos.query';

@Component({
  selector: 'app-mapa-progreso',
  templateUrl: './mapa-progreso.component.html',
  styleUrls: ['./mapa-progreso.component.scss']
})
export class MapaProgresoComponent implements OnInit {
  picos$: Observable<Pico[]> = new Observable();
  totalAscendidos = 0;
  readonly totalTechos = Utils.totalTechos;

  constructor(
    private picosQuery: PicosQuery    
  ) {  }

  ngOnInit(): void {    
    this.picos$ = this.picosQuery.selectAll();
    this.totalAscendidos = this.picosQuery.getTotalAscendidos();
  }
}
