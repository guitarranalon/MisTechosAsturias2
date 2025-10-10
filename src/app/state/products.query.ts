import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';


import { ProductsState, ProductsStore } from './products.store';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsQuery extends QueryEntity<ProductsState, Product> {
  constructor(protected store: ProductsStore) {
    super(store);
  }
}
