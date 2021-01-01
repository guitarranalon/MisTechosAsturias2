import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pico } from 'src/app/state/pico.model';
import { PicosQuery } from 'src/app/state/picos.query';

@Component({
  selector: 'app-mapa-asturias-svg',
  templateUrl: './mapa-asturias-svg.component.html',
  styleUrls: ['./mapa-asturias-svg.component.scss']
})
export class MapaAsturiasSVGComponent implements OnInit {

  constructor(
    private picosQuery: PicosQuery
  ) {  }

  ngOnInit(): void {    
  
  }

  getAscendido(id: number): Observable<boolean | undefined> {
    const ascendido$ = this.picosQuery.selectEntity(id, 'ascendido');
    return ascendido$;
  }
}
