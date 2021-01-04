import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapaTopograficoComponent } from './components/mapa-topografico/mapa-topografico.component';
import { MapaProgresoComponent } from './components/mapa-progreso/mapa-progreso.component';
import { ListadoPicosComponent } from './components/listado-picos/listado-picos.component';
import { MapaAsturiasSVGComponent } from './components/mapa-asturias-svg/mapa-asturias-svg.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    MapaTopograficoComponent,
    MapaProgresoComponent,
    ListadoPicosComponent,
    MapaAsturiasSVGComponent,
    MainNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
