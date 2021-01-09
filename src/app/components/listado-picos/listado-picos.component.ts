import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Pico } from 'src/app/state/pico.model';
import { PicosQuery } from 'src/app/state/picos.query';
import { PicosService } from 'src/app/state/picos.service';

@Component({
  selector: 'app-listado-picos',
  templateUrl: './listado-picos.component.html',
  styleUrls: ['./listado-picos.component.scss']
})
export class ListadoPicosComponent implements OnInit {
  picos$: Observable<Pico[]> = new Observable();
  listadoPicos;

  constructor(
    private picosQuery: PicosQuery,
    private picosService: PicosService
  ) { 
    this.listadoPicos = new FormGroup({ });
   }

  ngOnInit(): void {    
    this.picos$ = this.picosQuery.selectAll();
  }

  clickAscendido(pico: Pico) {
    this.picosService.toggleAscendido(pico);
  }

  nuevaBusqueda(searchTerm: string) {
    this.picos$ = this.picosQuery.selectLikeNombreConcejo(searchTerm);
  }
}
