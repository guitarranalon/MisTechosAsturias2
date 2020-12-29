import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Pico } from './pico.model';

export interface PicosState extends EntityState<Pico> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'picos' })
export class PicosStore extends EntityStore<PicosState, Pico> {

  constructor() {
    super();
  }

}

