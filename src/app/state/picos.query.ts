import { Injectable } from '@angular/core';
import { combineQueries, Order, QueryEntity } from '@datorama/akita';
import { PicosStore, PicosState } from './picos.store';
import { Pico } from './pico.model';
import { Observable } from 'rxjs';
import { TipoOrdenacion, tiposdeOrdenacion } from '../components/menu-ordenacion/menu-ordenacion.component';

export interface FilterAndOrder {
  sortBy?: 'nombre' | 'concejo' | 'altura';
  sortByOrder?: Order;
  searchText?: string | undefined;
}

@Injectable({
  providedIn: 'root'
})
export class PicosQuery extends QueryEntity<PicosState, Pico> {

  lastSearch: string = '';
  lastSort: 'nombre' | 'concejo' | 'altura' = 'concejo';
  lastSortOrder: Order = Order.ASC;

  constructor(protected store: PicosStore) {
    super(store);
  }

  private filterNombreYConcejoLike = (pico: Pico) => (pico.nombre.toLowerCase().includes(this.lastSearch) || pico.concejo.toLowerCase().includes(this.lastSearch))

  selectLikeNombreConcejo(text: string): any {
    this.lastSearch = text;

    return this.selectAll({
      filterBy: this.filterNombreYConcejoLike
    });
  }

  selectOrderByAltitudDesc(): any {
    return this.selectAll({
      sortBy: 'altura',
      sortByOrder: Order.DESC
    });
  }

  selectOrderByAltitudAsc(): any {
    return this.selectAll({
      sortBy: 'altura',
      sortByOrder: Order.ASC
    });
  }

  selectOrderByNombrePicoAlfabetico(): any {
    return this.selectAll({
      sortBy: 'nombre',
      sortByOrder: Order.ASC
    });
  }

  parameterizedSelectAll(filterAndOrder: FilterAndOrder): any {
    this.lastSort = filterAndOrder.sortBy !== undefined ? filterAndOrder.sortBy : this.lastSort;
    this.lastSearch = filterAndOrder.searchText !== undefined ? filterAndOrder.searchText.toLowerCase() : this.lastSearch;
    this.lastSortOrder = filterAndOrder.sortByOrder !== undefined ? filterAndOrder.sortByOrder : this.lastSortOrder;

    return this.selectAll({
      filterBy: this.filterNombreYConcejoLike,
      sortBy: this.lastSort,
      sortByOrder: this.lastSortOrder
    });
  }

  getTotalAscendidos(): Observable<Pico[]> {
    return this.selectAll({ 
      filterBy: pico => (pico.ascendido === true)
    });    
  }
}
