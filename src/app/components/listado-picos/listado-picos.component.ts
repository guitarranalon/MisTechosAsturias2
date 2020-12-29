import { Component, OnInit } from '@angular/core';
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

  constructor(
    private picosService: PicosService, 
    private picosQuery: PicosQuery    
  ) {  }

  ngOnInit(): void {
    this.picosService.get();
    
    this.picos$ = this.picosQuery.selectAll();
  }

}
