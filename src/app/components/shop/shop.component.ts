import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Product } from 'src/app/state/product.model';
import { ProductsQuery } from 'src/app/state/products.query';
import { ProductsService } from 'src/app/state/products.service';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [AsyncPipe, ProductComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {
  products$: Observable<Product[]> = new Observable();

  constructor(
    private productsQuery: ProductsQuery,
    private productsService: ProductsService,
  ) {  }

  ngOnInit(): void {
    this.productsService.get();
    this.products$ = this.productsQuery.selectAll();
  }
}
