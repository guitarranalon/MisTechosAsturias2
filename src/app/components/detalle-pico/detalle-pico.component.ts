import { AfterViewInit, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubscriptionManager } from 'src/app/classes/subscription-manager';
import { Pico } from 'src/app/state/pico.model';
import { PicosQuery } from 'src/app/state/picos.query';
import OlMap from 'ol/Map';
import { View, Feature } from 'ol';
import {Fill, Icon, Stroke, Style, Text} from 'ol/style';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { ScaleLine, defaults as DefaultControls} from 'ol/control';
import { environment } from 'src/environments/environment';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { MapHelper } from 'src/app/classes/map-helper';
import { DecimalPipe } from '@angular/common';
import { DificultadPipe } from 'src/app/pipes/dificultad.pipe';
import { PicosService } from 'src/app/state/picos.service';
import { BehaviorSubject } from 'rxjs';
import { Utils } from 'src/app/classes/utils';

const PARAMETRO_GET = 'id';

@Component({
  selector: 'app-detalle-pico',
  templateUrl: './detalle-pico.component.html',
  styleUrls: ['./detalle-pico.component.scss']
})
export class DetallePicoComponent implements OnInit, OnDestroy, AfterViewInit {

  id: number;
  pico: Pico;
  picosCercanos = new Map<number, Pico>();
  picoActual = new BehaviorSubject<Pico | null>(null);

  // Propiedades necesarias para el mapa
  Map: OlMap;
  view: View;
  mapHelper: MapHelper;
  vectorLayer: VectorLayer;

  sm = new SubscriptionManager();

  constructor(
    private route: ActivatedRoute,
    private picosQuery: PicosQuery,
    private zone: NgZone,
    private decimalPipe: DecimalPipe,
    private dificultadPipe: DificultadPipe,
    private picosService: PicosService
  ) {
    this.mapHelper = new MapHelper(decimalPipe, dificultadPipe);
   }

  ngOnInit(): void {
    this.sm.addSubscription(this.route.paramMap.subscribe(params => {
      const param = params.get(PARAMETRO_GET);

      if (param) {
        this.id = +(param);

        this.sm.addSubscription(this.picosQuery.selectEntity(this.id).subscribe(
          (pico: Pico) => {
            this.pico = pico;
            this.picoActual.next(pico);

            if (this.pico) {
              this.picosService.getDetalle(this.id);

              // Se obtiene la información de los picos cercanos
              this.getClosestPeaksNames();
            }
          }
        ));
      }
    }));
  }

  ngAfterViewInit():void {
    this.picoActual.subscribe( (pico) => {
      if (! this.Map) {
        this.zone.runOutsideAngular(() => this.initMap())
      } else {
        this.Map.removeLayer(this.vectorLayer);
        this.createMarkers();
        this.Map.setView(new View({
          center: olProj.fromLonLat([this.pico.longitud, this.pico.latitud]),
          zoom: 13,
        }));
      }
    });
  }

  private initMap(): void{
    this.view = new View({
      center: olProj.fromLonLat([this.pico.longitud, this.pico.latitud]),
      zoom: 13,
    });
    this.Map = new OlMap({
      layers: [new TileLayer({
        source: new OSM({})
      })],
      target: 'map',
      view: this.view,
      controls: DefaultControls().extend([
        new ScaleLine({}),
      ]),
    });

    // markers
    this.createMarkers();    
  }

  private createMarkers() {
    let features: Feature[] = [];

    var iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 0.5],
        anchorXUnits: IconAnchorUnits.FRACTION,
        anchorYUnits: IconAnchorUnits.FRACTION,
        src: `${environment.baseHref}/assets/img/pinMapa.svg`,
      }),
    });

    let salidaStyle = new Style({
      image: new Icon({
        anchor: [0.5, 1],
        anchorXUnits: IconAnchorUnits.FRACTION,
        anchorYUnits: IconAnchorUnits.FRACTION,
        src: `${environment.baseHref}/assets/img/salida.svg`,
      }),
    });

    let iconFeature = this.mapHelper.createFeature(this.pico);
    let text = new Text({
      font: 10 + 'px fauna,sans-serif',
      fill: new Fill({ color: '#000' }),
      stroke: new Stroke({
        color: '#fff', width: 2
      }),        
      offsetY: 25,
      text: this.pico.nombre
    });
    let style = iconStyle;
    style.setText(text);
    iconFeature.setStyle(style);
    features.push(iconFeature);
    
    // Salida
    if (this.pico.detalle) {
      let salidaFeature = this.mapHelper.createFeatureSalida(this.pico);
      let salidaText = new Text({
        font: 10 + 'px fauna, sans-serif',
        fill: new Fill({ color: '#000' }),
        stroke: new Stroke({
          color: '#fff', width: 2
        }),
        offsetY: 10,
        text: this.pico.detalle.inicioRuta.nombre
      });
      salidaStyle.setText(salidaText);
      salidaFeature.setStyle(salidaStyle);
      features.push(salidaFeature);
    }

    var vectorSource = new VectorSource({
      features: features,
    });

    this.vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    this.Map.addLayer(this.vectorLayer);
  }

  ngOnDestroy() {
    this.sm.removeAllSubscriptions();
  }

  private getClosestPeaksNames() {
    if (this.pico.detalle) {
      for(const idPico of this.pico.detalle.ascendidoCon){
        this.picosCercanos.set(idPico, this.picosQuery.getEntity(idPico));
      }
    }
  }

  ponerComaSiCorresponde(pico: number): string {
    if (!this.pico.detalle) return '';

    // Si el index actual +1 < tamaño del array
    return ((this.pico.detalle.ascendidoCon.findIndex((i) => i === pico) + 1) < this.pico.detalle.ascendidoCon.length) ? ',' : '';
  }

  isMobile(): boolean {
    return Utils.isMobile();
  }
}
