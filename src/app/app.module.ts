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
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ObservacionesComponent } from './components/observaciones/observaciones.component';
import { AvisoLegalComponent } from './components/aviso-legal/aviso-legal.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuOrdenacionComponent } from './components/menu-ordenacion/menu-ordenacion.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

registerLocaleData(localeEsES, 'es');

@NgModule({
  declarations: [
    AppComponent,
    MapaTopograficoComponent,
    MapaProgresoComponent,
    ListadoPicosComponent,
    MapaAsturiasSVGComponent,
    MainNavComponent,
    SvgSpriteComponent,
    NotFoundComponent,
    ObservacionesComponent,
    AvisoLegalComponent,
    FooterComponent,
    SearchBarComponent,
    MenuOrdenacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    DecimalPipe,
    { provide: LOCALE_ID, useValue: 'es' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
