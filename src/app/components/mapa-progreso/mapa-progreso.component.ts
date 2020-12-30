import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pico } from 'src/app/state/pico.model';
import { PicosQuery } from 'src/app/state/picos.query';

@Component({
  selector: 'app-mapa-progreso',
  templateUrl: './mapa-progreso.component.html',
  styleUrls: ['./mapa-progreso.component.scss']
})
export class MapaProgresoComponent implements OnInit {
  picos$: Observable<Pico[]> = new Observable();

  constructor(
    private picosQuery: PicosQuery    
  ) {  }

  ngOnInit(): void {    
    this.picos$ = this.picosQuery.selectAll();
  }
}
