import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapaTopograficoComponent } from './components/mapa-topografico/mapa-topografico.component';
import { MapaProgresoComponent } from './components/mapa-progreso/mapa-progreso.component';
import { ListadoPicosComponent } from './components/listado-picos/listado-picos.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
