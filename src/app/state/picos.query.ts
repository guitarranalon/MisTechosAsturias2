import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { PicosStore, PicosState } from './picos.store';
import { Pico } from './pico.model';

@Injectable({
  providedIn: 'root'
})
export class PicosQuery extends QueryEntity<PicosState, Pico> {

  constructor(protected store: PicosStore) {
    super(store);
  }

  selectLikeNombreConcejo(text: string): any {
    return this.selectAll({
      filterBy: pico => (pico.nombre.toLowerCase().includes(text) || pico.concejo.toLowerCase().includes(text))
    });
  }
}