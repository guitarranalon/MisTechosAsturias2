import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapaTopograficoComponent } from './components/mapa-topografico/mapa-topografico.component';
import { MapaProgresoComponent } from './components/mapa-progreso/mapa-progreso.component';
import { ListadoPicosComponent } from './components/listado-picos/listado-picos.component';

@NgModule({
  declarations: [
    AppComponent,
    MapaTopograficoComponent,
    MapaProgresoComponent,
    ListadoPicosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
