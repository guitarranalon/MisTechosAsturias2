import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapaTopograficoComponent } from './components/mapa-topografico/mapa-topografico.component';
import { MapaProgresoComponent } from './components/mapa-progreso/mapa-progreso.component';
import { ListadoPicosComponent } from './components/listado-picos/listado-picos.component';
import { MapaAsturiasSVGComponent } from './components/mapa-asturias-svg/mapa-asturias-svg.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import localeEsES from '@angular/common/locales/es';
import { DecimalPipe, registerLocaleData } from '@angular/common';
import { SvgSpriteComponent } from './components/svg-sprite/svg-sprite.component';

registerLocaleData(localeEsES, 'es');

@NgModule({
  declarations: [
    AppComponent,
    MapaTopograficoComponent,
    MapaProgresoComponent,
    ListadoPicosComponent,
    MapaAsturiasSVGComponent,
    MainNavComponent,
    SvgSpriteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [
    DecimalPipe,
    { provide: LOCALE_ID, useValue: 'es' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
