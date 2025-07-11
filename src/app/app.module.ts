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
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { Utils } from './classes/utils';
import { PicoMasCercanoComponent } from './components/pico-mas-cercano/pico-mas-cercano.component';
import { AlertBoardComponent } from './components/alert-board/alert-board.component';
import { DificultadPipe } from './pipes/dificultad.pipe';
import { DetallePicoComponent } from './components/detalle-pico/detalle-pico.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { SvgShareComponent } from './components/svg-share/svg-share.component';
import { DownloadTrackButtonComponent } from './components/download-track-button/download-track-button.component';

registerLocaleData(localeEsES, 'es');

const dbConfig: DBConfig  = {
  name: 'techosDB',
  version: 1,
  objectStoresMeta: [{
    store: Utils.storeName,
    storeConfig: { keyPath: 'id', autoIncrement: false },
    storeSchema: [
      { name: 'id', keypath: 'id', options: { unique: true } },
      { name: 'ascendido', keypath: 'ascendido', options: { unique: false } }
    ]
  }]
};

@NgModule({ declarations: [
        AppComponent,
        MapaTopograficoComponent,
        MapaProgresoComponent,
        ListadoPicosComponent,
        MapaAsturiasSVGComponent,
        SvgShareComponent,
        MainNavComponent,
        SvgSpriteComponent,
        NotFoundComponent,
        ObservacionesComponent,
        AvisoLegalComponent,
        FooterComponent,
        SearchBarComponent,
        MenuOrdenacionComponent,
        PicoMasCercanoComponent,
        AlertBoardComponent,
        DificultadPipe,
        DownloadTrackButtonComponent,
        DetallePicoComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
        NgxIndexedDBModule.forRoot(dbConfig)], providers: [
        DecimalPipe,
        DificultadPipe,
        { provide: LOCALE_ID, useValue: 'es' },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
