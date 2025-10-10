import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { ProductsStore } from './products.store';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { HttpClient } from '@angular/common/http';
import { ProductsQuery } from './products.query';

const listado: Array<Product> = [
  {
    id: 1,
    text: "Bolsa Techos de Asturias",
    img: "bolsa-techos-de-asturias.webp",
    link: "https://www.latostadora.com/web/bolsa-techos-de-asturias/18912395",
  },
  {
    id: 2,
    text: "Botella Techos de Asturias",
    img: "botella-techos-de-asturias.webp",
    link: "https://www.latostadora.com/web/botella-techos-de-asturias-montanas/18912463",    
  },
  {
    id: 3,
    text: "Camiseta para mujer Techos de Asturias",
    img: "camiseta-mujer-techos-de-asturias.webp",
    link: "https://www.latostadora.com/web/camiseta-mujer-techos-de-asturias/18912386",    
  },
  {
    id: 4,
    text: "Camiseta Techos de Asturias",
    img: "camiseta-techos-de-asturias.webp",
    link: "https://www.latostadora.com/web/camiseta-techos-de-asturias/18912383",
  },
  {
    id: 5,
    text: "Delantal Techos de Asturias",
    img: "delantal-techos-de-asturias.webp",
    link: "https://www.latostadora.com/web/techos-de-asturias/18912405",
  },
  {
    id: 6,
    text: "Mochila Techos de Asturias",
    img: "mochila-techos-de-asturias.webp",
    link: "https://www.latostadora.com/web/bolsa-techos-de-asturias/18912402",
  },
  {
    id: 7,
    text: "Sudadera con capucha Techos de Asturias",
    img: "sudadera-capucha-techos-de-asturias.webp",
    link: "https://www.latostadora.com/web/sudadera-techos-de-asturias/18912388",    
  },
  {
    id: 8,
    text: "Sudadera Techos de Asturias",
    img: "sudadera-techos-de-asturias.webp",
    link: "https://www.latostadora.com/web/sudadera-techos-de-asturias/18912390",
  },
  {
    id: 9,
    text: "Taza Techos de Asturias",
    img: "taza-techos-de-asturias-blanca.webp",
    link: "https://www.latostadora.com/web/taza-techos-de-asturias-montanas-blanca/18912459",
  },
  {
    id: 10,
    text: "Taza naranja Techos de Asturias",
    img: "taza-techos-de-asturias-naranja.webp",
    link: "https://www.latostadora.com/web/taza-techos-de-asturias-montanas-naranja/18912457",    
  },
];

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private picosStore: ProductsStore,
    private dbService: NgxIndexedDBService,
    private http: HttpClient,
    private productsQuery: ProductsQuery) { }

  get() {
    this.picosStore.set(listado);
  }
}
