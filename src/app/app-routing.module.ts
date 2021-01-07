import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapaTopograficoComponent } from './components/mapa-topografico/mapa-topografico.component';
import { MapaProgresoComponent } from './components/mapa-progreso/mapa-progreso.component';
import { ListadoPicosComponent } from './components/listado-picos/listado-picos.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ObservacionesComponent } from './components/observaciones/observaciones.component';
import { AvisoLegalComponent } from './components/aviso-legal/aviso-legal.component';

const routes: Routes = [
  { 
    path: '',   
    redirectTo: '/listado', 
    pathMatch: 'full' 
  },  
  {
    path: 'listado',
    component: ListadoPicosComponent
  },
  {
    path: 'mapa',
    component: MapaTopograficoComponent
  },
  {
    path: 'progreso',
    component: MapaProgresoComponent
  },
  {
    path: 'observaciones',
    component: ObservacionesComponent
  },
  {
    path: 'avisolegal',
    component: AvisoLegalComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
