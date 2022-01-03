import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { HttpClient } from '@angular/common/http';
import { PicosStore } from './picos.store';
import { Pico } from './pico.model';
import { Observable, of } from 'rxjs';
import { PicosQuery } from './picos.query';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Utils } from '../classes/utils';
import { first } from 'rxjs/operators';
import { DetallePico } from './detalle-pico.model';

const listado: Array<Pico> = [
  { id: 1, concejo:"Allande", nombre:"Pico Panchón", altura:1411, dificultad: 1, latitud:43.269427, longitud:-6.660072, ascendido: false }
  ,
  { id: 2, concejo:"Aller", nombre:"Estorbín de Valverde", altura:2115, dificultad: 2, latitud:43.0443583, longitud:-5.6504222, ascendido: false, imagen: 'estorbin.jpg' }
  ,
  { id: 3, concejo:"Amieva", nombre:"Torre de Enmedio", altura:2465, dificultad:3, latitud:43.2085805, longitud:-4.97495, ascendido: false, imagen:'torredeenmedio.jpg' }
  ,
  { id: 4, concejo:"Avilés", nombre:"El Vallín", altura:131, dificultad:1, latitud:43.5362083, longitud:-5.9335194, alternativas:[
    {id: 5, nombre:"Miranda", altura:143, dificultad:1, latitud:43.5375194, longitud:-5.944175, ascendido: false }
  ], ascendido: false }
  ,
  { id: 6, concejo:"Belmonte de Miranda", nombre:"Picu Horru", altura:1527, dificultad:2, latitud:43.21707773982595, longitud:-6.277409739416583, ascendido: false, imagen: 'horru.jpg' }
  ,
  { id: 7, concejo:"Bimenes", nombre:"Peña Mayor", altura:1144, dificultad:1, latitud:43.3102583 , longitud:-5.5138555, ascendido: false, imagen: 'mayor.jpg' }
  ,
  { id: 8, concejo:"Boal", nombre:"Prado Roque", altura:1104, dificultad:1, latitud:43.3503166, longitud:-6.7763166, ascendido: false }
  ,
  { id: 9, concejo:"Cabrales", nombre:"Torrecerredo", altura:2648, dificultad:3, latitud:43.197775, longitud:-4.8528388, ascendido: false, imagen: 'torrecerredo.jpg' }
  ,
  { id: 10, concejo:"Cabranes", nombre:"Monte Incós", altura:581, dificultad:1, latitud:43.3913777, longitud:-5.3847638, ascendido: false }
  ,
  { id: 11, concejo:"Candamo", nombre:"Pico Pedroso", altura:614, dificultad:1, latitud:43.4356249, longitud:-6.0203916, imagen: 'pedroso.jpg', ascendido: false }
  ,
  { id: 12, concejo:"Cangas de Onís", nombre:"Torre Santa de Enol", altura:2478, dificultad:3, latitud:43.2124333, longitud:-4.9745138, ascendido: false, imagen: 'torresantamaria.jpg' }
  ,
  { id: 13, concejo:"Cangas del Narcea", nombre:"Cueto Arbás", altura:2007, dificultad:2, latitud:42.9930194, longitud:-6.4369805, ascendido: false }
  ,
  { id: 14, concejo:"Caravia", nombre:"Piedra Redonda", altura:631, dificultad:1, latitud:43.4391583, longitud:-5.1947555, ascendido: false, imagen: 'piedraredonda.jpg' }
  ,
  { id: 15, concejo:"Carreño", nombre:"Monte Areo", altura:264, dificultad:1, latitud:43.5278555, longitud:-5.7792638, ascendido: false, imagen: 'areo.jpg' }
  ,
  { id: 16, concejo:"Caso", nombre:"Pico Torres", altura:2104, dificultad:3, latitud:43.0783222, longitud:-5.4085444, ascendido: false, imagen: 'torres.jpg' }
  ,
  { id: 17, concejo:"Castrillón", nombre:"Prado del Marqués", altura:431, dificultad:1, latitud:43.5127888, longitud:-6.0201138, ascendido: false, imagen: 'pradomarques.jpg' }
  ,
  { id: 18, concejo:"Castropol", nombre:"Peña el Filso", altura:1201, dificultad:1, latitud:43.3781333, longitud:-6.9464277, ascendido: false }
  ,
  { id: 19, concejo:"Coaña", nombre:"Pico Fonteblanca", altura:741, dificultad:1, latitud:43.4654916, longitud:-6.7802083, ascendido: false }
  ,
  { id: 20, concejo:"Colunga", nombre:"Pico Pienzu", altura:1159, dificultad:1, latitud:43.4318611, longitud:-5.2422305, ascendido: false }
  ,
  { id: 21, concejo:"Corvera", nombre:"Pico Prieto", altura:366, dificultad:1, latitud:43.5016111, longitud:-5.8957583, ascendido: false, imagen: 'prieto.jpg' }
  ,
  { id: 22, concejo:"Cudillero", nombre:"Pico Cueto", altura:778, dificultad:1, latitud:43.5069972, longitud:-6.2652583, ascendido: false }
  ,
  { id: 23, concejo:"Degaña", nombre:"Alcornón de Busmori", altura:1934, dificultad:2, latitud:42.9129944, longitud:-6.5428138, ascendido: false }
  ,
  { id: 24, concejo:"El Franco", nombre:"Pico la Penouta", altura:899, dificultad:1, latitud:43.4555472, longitud:-6.8226333, ascendido: false }
  ,
  { id: 25, concejo:"Gijón", nombre:"Peña de los Cuatro Jueces", altura:662, dificultad:1, latitud:43.4426444, longitud:-5.5843166, ascendido: false, imagen: 'cuatrojueces.jpg' }
  ,
  { id: 26, concejo:"Gozón", nombre:"Tabladas", altura:138, dificultad:1, latitud:43.5762777, longitud:-5.8833777, ascendido: false, imagen: 'tabladas.jpg' }
  ,
  { id: 27, concejo:"Grado", nombre:"Pico la Berza", altura:1454, dificultad:1, latitud:43.1833305, longitud:-6.2005111, ascendido: false }
  ,
  { id: 28, concejo:"Grandas de Salime", nombre:"Piedras Apañadas", altura:1201, dificultad:1, latitud:43.1394583, longitud:-6.9571194, ascendido: false }
  ,
  { id: 29, concejo:"Ibias", nombre:"Peña Roguera o Torrunteira", altura:1961, dificultad:2, latitud:42.9166055, longitud:-6.7050361, ascendido: false }
  ,
  { id: 30, concejo:"Illano", nombre:"Pico Gargalois", altura:1167, dificultad:2, latitud:43.3405527, longitud:-6.7816805, ascendido: false }
  ,
  { id: 31, concejo:"Illas", nombre:"Pico Friera o Bufarán", altura:619, dificultad:1, latitud:43.4913666, longitud:-5.9426555, ascendido: false, imagen: 'friera.jpg' }
  ,
  { id: 32, concejo:"Langreo", nombre:"Pico San Justo o Cogollu", altura:1021, dificultad:1, latitud:43.2312694, longitud:-5.6899833, ascendido: false, imagen: 'cogollu.jpg' }
  ,
  { id: 33, concejo:"Laviana", nombre:"Peña Mea", altura:1560, dificultad:2, latitud:43.1750861, longitud:-5.5610777, ascendido: false, imagen: 'mea.jpg' }
  ,
  { id: 34, concejo:"Lena", nombre:"Peña Ubiña", altura:2417, dificultad:3, latitud:43.0183638, longitud:-5.9567055, ascendido: false, imagen: 'ubina.jpg' }
  ,
  { id: 35, concejo:"Llanera", nombre:"Pico Gorfolí", altura:585, dificultad:1, latitud:43.4809805, longitud:-5.9313194, ascendido: false, imagen: 'gorfoli.jpg' }
  ,
  { id: 36, concejo:"Llanes", nombre:"Pico Cabeza Bubena", altura:1199, dificultad:2, latitud:43.3594194, longitud:-4.8573527, ascendido: false }
  ,
  { id: 37, concejo:"Mieres", nombre:"Pico Cuetu Ventosu", altura:1149, dificultad:1, latitud:43.1954749, longitud:-5.6458027,alternativas:[
    {id: 38, nombre:"Burra Blanca", altura:1153, dificultad:1, latitud:43.1930833, longitud:-5.6315944, ascendido: false }
  ], ascendido: false }
  ,
  { id: 39, concejo:"Morcín", nombre:"Pico La Gamonal", altura:1712, dificultad:2, latitud:43.2288111, longitud:-5.9481027, ascendido: false, imagen: 'gamonal.jpg' }
  ,
  { id: 40, concejo:"Muros del Nalón", nombre:"Muros", altura:132, dificultad:1, latitud:43.5422416, longitud:-6.1054277, ascendido: false }
  ,
  { id: 41, concejo:"Nava", nombre:"Triguero", altura:1291, dificultad:1, latitud:43.2769722, longitud:-5.4999638, ascendido: false, imagen: 'triguero.jpg' }
  ,
  { id: 42, concejo:"Navia", nombre:"El Can", altura:842, dificultad:1, latitud:43.4851472, longitud:-6.6435999, ascendido: false, imagen: 'panondres.jpg' }
  ,
  { id: 43, concejo:"Noreña", nombre:"Pico Santo Medero", altura:522, dificultad:1, latitud:43.3384222, longitud:-5.7310027, ascendido: false, imagen: 'santomedero.jpg' }
  ,
  { id: 44, concejo:"Onís", nombre:"Pico la Verdilluenga", altura:2129, dificultad:3, latitud:43.2247777, longitud:-4.9427305, ascendido: false }
  ,
  { id: 45, concejo:"Oviedo", nombre:"Picajo", altura:709, dificultad:1, latitud:43.2961083, longitud:-5.7736222, ascendido: false, imagen: 'escobin.jpg' }
  ,
  { id: 46, concejo:"Parres", nombre:"Pico la Mota de Cetín", altura:1134, dificultad:2, latitud:43.2804222, longitud:-5.2029305, ascendido: false, imagen: 'motacetin.jpg' }
  ,
  { id: 47, concejo:"Peñamellera Alta", nombre:"Pico Jajao", altura:1425, dificultad:2, latitud:43.2649527, longitud:-4.7042833, ascendido: false }
  ,
  { id: 48, concejo:"Peñamellera Baja", nombre:"Picu Cuetu la Cerralosa", altura:1563, dificultad:2, latitud:43.265875, longitud:-4.6839777, ascendido: false }
  ,
  { id: 49, concejo:"Pesoz", nombre:"Pico Mosqueiro", altura:888, dificultad:1, latitud:43.3181555, longitud:-6.8900361, ascendido: false }
  ,
  { id: 50, concejo:"Piloña", nombre:"Pico Vízcares", altura:1419, dificultad:2, latitud:43.2659555, longitud:-5.2993027, ascendido: false, imagen: 'vizcares.jpg' }
  ,
  { id: 51, concejo:"Ponga", nombre:"Peña Ten", altura:2140, dificultad:3, latitud:43.103475, longitud:-5.1418611, ascendido: false, imagen: 'ten.jpg' }
  ,
  { id: 52, concejo:"Pravia", nombre:"Pico Llan de Cubel", altura:678, dificultad:1, latitud:43.5145555, longitud:-6.2180777, ascendido: false }
  ,
  { id: 53, concejo:"Proaza", nombre:"Peña Barzanalgas", altura:1489, dificultad:2, latitud:43.1691555, longitud:-6.0589138, ascendido: false }
  ,
  { id: 54, concejo:"Quirós", nombre:"Fontán Norte", altura:2417, dificultad:3, latitud:43.034875, longitud:-5.9589611, imagen: 'fontan.jpg', alternativas:[
    {id: 55, nombre:"Fontán Sur", altura:2414, dificultad:3, latitud:43.0336722, longitud:-5.9604972, ascendido: false }
  ], ascendido: false }
  ,
  { id: 56, concejo:"Las Regueras", nombre:"Pico Alto la Degollada", altura:613, dificultad:1, latitud:43.4520138, longitud:-6.0058944, imagen: 'degollada.jpg', ascendido: false }
  ,
  { id: 57, concejo:"Ribadedeva", nombre:"Pico Cuetu el Plaganu", altura:605, dificultad:1, latitud:43.3499277, longitud:-4.6256416, ascendido: false }
  ,
  { id: 58, concejo:"Ribadesella", nombre:"Pico Mofrechu", altura:891, dificultad:1, latitud:43.4075333, longitud:-5.0412361, imagen: 'mofrechu.jpg', ascendido: false }
  ,
  { id: 59, concejo:"Ribera de Arriba", nombre:"Pico Magarrón", altura:655, dificultad:2, latitud:43.2845472, longitud:-5.8443083, ascendido: false, imagen: 'magarron.jpg' }
  ,
  { id: 60, concejo:"Riosa", nombre:"Pico Xistras", altura:1775, dificultad:2, latitud:43.1897527, longitud:-5.9165333, ascendido: false, imagen: 'xistras.jpg' }
  ,
  { id: 61, concejo:"Salas", nombre:"Pico Aguión", altura:927, dificultad:1, latitud:43.46235, longitud:-6.3020833, ascendido: false }
  ,
  { id: 62, concejo:"San Martín del Rey Aurelio", nombre:"Pico Tres Concejos", altura:1096, dificultad:1, latitud:43.2206611, longitud:-5.6288666, ascendido: false }
  ,
  { id: 63, concejo:"San Martín de Oscos", nombre:"Pico La Vaga", altura:1081, dificultad:1, latitud:43.356675, longitud:-6.9298777, ascendido: false }
  ,
  { id: 64, concejo:"Santa Eulalia de Oscos", nombre:"Pico Oteiro Grande", altura:948, dificultad:1, latitud:43.3002277, longitud:-7.05345, ascendido: false }
  ,
  { id: 65, concejo:"San Tirso de Abres", nombre:"Pico Xunqueira", altura:661, dificultad:1, latitud:43.390075, longitud:-7.1136694, ascendido: false }
  ,
  { id: 66, concejo:"Santo Adriano", nombre:"Pico Grandamiana", altura:806, dificultad:1, latitud:43.2871833, longitud:-6.0211611, ascendido: false, imagen: 'grandamiana.jpg' }
  ,
  { id: 67, concejo:"Sariego", nombre:"Pico Cima", altura:733, dificultad:1, latitud:43.4345416, longitud:-5.5922388, ascendido: false, imagen: 'cima.jpg' }
  ,
  { id: 68, concejo:"Siero", nombre:"Pico Cerro Gabio", altura:709, dificultad:1, latitud:43.4294055, longitud:-5.5976638, ascendido: false, imagen: 'cerrogabio.jpg' }
  ,
  { id: 69, concejo:"Sobrescobio", nombre:"Retriñón", altura:1862, dificultad:3, latitud:43.1342083, longitud:-5.4637527, ascendido: false, imagen: 'retri.jpg' }
  ,
  { id: 70, concejo:"Somiedo", nombre:"Peña Orniz", altura:2194, dificultad:3, latitud:43.0238194, longitud:-6.1222972, ascendido: false, imagen: 'orniz.jpg' }
  ,
  { id: 71, concejo:"Soto del Barco", nombre:"Pico Alto la Corona", altura:467, dificultad:1, latitud:43.4820333, longitud:-6.0553222, ascendido: false }
  ,
  { id: 72, concejo:"Tapia de Casariego", nombre:"Pico Pousadoiro", altura:643, dificultad:1, latitud:43.4755416, longitud:-6.9576222, ascendido: false }
  ,
  { id: 73, concejo:"Taramundi", nombre:"Pico Abrego de Ouroso", altura:1032, dificultad:1, latitud:43.3403388, longitud:-7.0296194, ascendido: false, imagen: 'ouroso.jpg' }
  ,
  { id: 74, concejo:"Teverga", nombre:"Ferreirúa", altura:1980, dificultad:2, latitud:43.0626138, longitud:-6.03715, ascendido: false, imagen: 'ferreirua.jpg' }
  ,
  { id: 75, concejo:"Tineo", nombre:"La Patana", altura:1526, dificultad:1, latitud:43.1624583, longitud:-6.3538138, ascendido: false }
  ,
  { id: 76, concejo:"Valdés", nombre:"Capiella Martín", altura:986, dificultad:1, latitud:43.4547611, longitud:-6.5988777, ascendido: false, imagen: 'capiellamartin.jpg' }
  ,
  { id: 77, concejo:"Vegadeo", nombre:"Pozo de la Nieve", altura:1130, dificultad:1, latitud:43.3748194, longitud:-6.9624388, ascendido: false }
  ,
  { id: 78, concejo:"Villanueva de Oscos", nombre:"Fuente Sagrada", altura:1162, dificultad:1, latitud:43.3725388, longitud:-6.9407916, ascendido: false }
  ,
  { id: 79, concejo:"Villaviciosa", nombre:"Viesca Redonda", altura:643, dificultad:1, latitud:43.4282194, longitud:-5.5592527, ascendido: false, imagen: 'viescaredonda.jpg' }
  ,
  { id: 80, concejo:"Villayón", nombre:"Carondio", altura:1221, dificultad:2, latitud:43.3202444, longitud:-6.7506277, ascendido: false }
  ,
  { id: 81, concejo:"Yernes y Tameza", nombre:"Peña Cruzada", altura:1374, dificultad:1, latitud:43.21841611766171, longitud:-6.144587370745059, ascendido: false, imagen: 'cruzada.jpg' }
  ];

@Injectable({ providedIn: 'root' })
export class PicosService {

  constructor(
    private picosStore: PicosStore,
    private dbService: NgxIndexedDBService,
    private http: HttpClient,
    private picosQuery: PicosQuery) { }

  get() {
    this.picosStore.set(listado);

    this.updateAscendidosListado();
  }

  getDetalle(id: ID) {
    if (!this.picosQuery.getEntity(id).detalle) {
      this.http.get<DetallePico>(`./assets/data/${id}.json`).pipe(first()).subscribe(
        (detallePico: DetallePico) => {
          return this.picosStore.update(id, { detalle: detallePico });
        }
      );
    }
  }

  toggleAscendido({ id, ascendido }: Pico) {
    const nuevoValor = !ascendido;
    this.picosStore.update(id, { ascendido: nuevoValor });

    this.upsertDatabase(id, nuevoValor);
  }

  private upsertDatabase(id: ID, ascendido: boolean) {
    this.dbService.getByKey(Utils.storeName, id).pipe(first()).subscribe( (techo) => { 
      if ( techo ) {
        this.dbService.update(Utils.storeName, { id, ascendido }).pipe(first()).subscribe(() => { });
      } else {
        this.dbService.add(Utils.storeName, { id, ascendido }).pipe(first()).subscribe(() => { });
      }
    });
  }

  private updateAscendidosListado() {
    for(let pico of listado) {
      this.dbService.getByKey(Utils.storeName, pico.id).pipe(first()).subscribe( ( techo ) => {
        // si está en indexeddb recogemos el valor
        if ( techo ) {
          this.picosStore.update(pico.id, { ascendido: techo.ascendido });
        }
      });
    }
  }
}
