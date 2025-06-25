import { Component, OnInit } from '@angular/core';
import { ID } from '@datorama/akita';
import { Observable } from 'rxjs';
import { Pico } from 'src/app/state/pico.model';
import { PicosQuery } from 'src/app/state/picos.query';

const TAG_CONCEJO = 'path';

@Component({
  selector: 'app-mapa-asturias-svg',
  templateUrl: './mapa-asturias-svg.component.html',
  styleUrls: ['./mapa-asturias-svg.component.scss']
})
export class MapaAsturiasSVGComponent implements OnInit {

  pico: Pico | null | undefined;

  readonly svgMapWidth: number = 777.74173;
  readonly svgMapHeight: number = 413.26299;

  constructor(
    private picosQuery: PicosQuery
  ) {  }

  ngOnInit(): void {    
  
  }

  getAscendido(id: number): Observable<boolean | undefined> {
    const ascendido$ = this.picosQuery.selectEntity(id, 'ascendido');
    return ascendido$;
  }

  concejoSeleccionado(e: Event) {
    const target = (e.target as Element);
    let id: string = ((e.target as Element).id).slice(1);

    if (target.tagName === TAG_CONCEJO && id) {
      this.pico = (this.pico && this.pico.id === parseInt(id)) ? null : this.picosQuery.getEntity(id);
    } 
  }

  getSelected(idPico: ID): boolean {
    if (!this.pico) return false;

    return this.pico.id === idPico;
  }

  getViewBox(): string {
    return `0 0 ${this.svgMapWidth} ${this.svgMapHeight}`;
  }
}
