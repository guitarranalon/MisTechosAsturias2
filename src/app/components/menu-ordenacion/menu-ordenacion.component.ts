import { Component, EventEmitter, OnInit, Output } from '@angular/core';

export const tiposdeOrdenacion = {concejoalfabetico: 'concejoalfabetico', altituddesc:'altituddesc', altitudasc: 'altitudasc', nombrepicoalfabetico: 'nombrepicoalfabetico'} as const;
export type TipoOrdenacion = typeof tiposdeOrdenacion[keyof typeof tiposdeOrdenacion];

@Component({
  selector: 'app-menu-ordenacion',
  templateUrl: './menu-ordenacion.component.html',
  styleUrls: ['./menu-ordenacion.component.scss']
})
export class MenuOrdenacionComponent implements OnInit {

  ordenacionActual: TipoOrdenacion = tiposdeOrdenacion.concejoalfabetico;

  @Output() cambioOrdenacion = new EventEmitter<TipoOrdenacion>();

  constructor() { }

  ngOnInit(): void {
  }

  cambiarOrden(nuevaOrdenacion: TipoOrdenacion) {
    this.ordenacionActual = nuevaOrdenacion;

    this.cambioOrdenacion.emit(nuevaOrdenacion);
  }

  isActive(ordenacion: TipoOrdenacion) {
    return this.ordenacionActual === ordenacion;
  }

}
