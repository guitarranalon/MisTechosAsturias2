import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {View, Map, Feature } from 'ol';
import { ScaleLine, defaults as DefaultControls} from 'ol/control';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import * as olProj from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import {Fill, Icon, Stroke, Style, Text} from 'ol/style';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import Overlay from 'ol/Overlay';
import { PicosQuery } from 'src/app/state/picos.query';
import { Pico } from 'src/app/state/pico.model';
import OverlayPositioning from 'ol/OverlayPositioning';
import { Coordinate } from 'ol/coordinate';
import { DecimalPipe } from '@angular/common';
import { Utils } from 'src/app/classes/utils';
import { environment } from 'src/environments/environment';
import { DificultadPipe } from 'src/app/pipes/dificultad.pipe';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { SubscriptionManager } from 'src/app/classes/subscription-manager';
import { MapHelper } from 'src/app/classes/map-helper';

const CANVAS_TAG = 'CANVAS';

@Component({
  selector: 'app-mapa-topografico',
  templateUrl: './mapa-topografico.component.html',
  styleUrls: ['./mapa-topografico.component.scss']
})
export class MapaTopograficoComponent implements OnInit, AfterViewInit, OnDestroy {

  Map: Map;
  view: View;
  picos: Pico[] = [];
  @ViewChild("popup") popup: ElementRef;

  mapHelper: MapHelper;

  sm = new SubscriptionManager();

  vectorLayer: VectorLayer;

  constructor(
    private zone: NgZone, 
    private cd: ChangeDetectorRef,
    private picosQuery: PicosQuery,
    private decimalPipe: DecimalPipe,
    private dificultadPipe: DificultadPipe ) { 
      this.mapHelper = new MapHelper(decimalPipe, dificultadPipe);
    }

  ngOnInit() {

  }

  ngAfterViewInit():void {

    this.sm.addSubscription(this.picosQuery.selectAll().subscribe( (picos) => {
      this.picos = picos;

      if (! this.Map) {
        this.zone.runOutsideAngular(() => this.initMap())
      } else {
        this.Map.removeLayer(this.vectorLayer);
        this.createMarkers();
      }
    } ));    
  }

  private initMap(): void{
    this.view = new View({
      center: olProj.fromLonLat([-5.844727, 43.319183]),
      zoom: 9,
    });
    this.Map = new Map({
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

    // popup
    this.createPopup();
  }

  private createMarkers(): void {
    let features: Feature[] = [];

    var iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 0.5],
        anchorXUnits: IconAnchorUnits.FRACTION,
        anchorYUnits: IconAnchorUnits.FRACTION,
        src: `${environment.baseHref}/assets/img/pinMapa.svg`,
      }),
    });

    var iconStyleAscendido = new Style({
      image: new Icon({
        anchor: [0.5, 0.5],
        anchorXUnits: IconAnchorUnits.FRACTION,
        anchorYUnits: IconAnchorUnits.FRACTION,
        src: `${environment.baseHref}/assets/img/pinMapaAscendido.svg`,
      }),
    });

    for(const pico of this.picos) {
      let iconFeature = this.mapHelper.createFeature(pico);
      let text = new Text({
        font: 10 + 'px fauna,sans-serif',
        fill: new Fill({ color: '#000' }),
        stroke: new Stroke({
          color: '#fff', width: 2
        }),        
        offsetY: 25,
        text: pico.nombre
      });
      let style = pico.ascendido ? iconStyleAscendido.clone() : iconStyle.clone();
      style.setText(text);
      iconFeature.setStyle(style);
      features.push(iconFeature);
    }
    
    var vectorSource = new VectorSource({
      features: features,
    });
    
    this.vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    this.Map.addLayer(this.vectorLayer);
  }
  
  private createPopup() {
    let popup = new Overlay({
      element: this.popup.nativeElement,
      positioning: OverlayPositioning.BOTTOM_CENTER,
      stopEvent: false,
      offset: [0, -25],
      autoPan: true,
      autoPanAnimation: {
        duration: 250,
      }
    });
    this.Map.addOverlay(popup);

    // display popup on click
    this.Map.on('click', (evt) => {
      var feature = this.Map.forEachFeatureAtPixel(evt.pixel, function (feature) {
        return (evt.originalEvent as any).srcElement.tagName === CANVAS_TAG ? feature : null; // Evitando que se clique los elementos por debajo del popup
      });
      if (feature) {
        let point: Point = <Point>feature.getGeometry();
        let coordinates: Coordinate = point.getCoordinates();

        this.popup.nativeElement.getElementsByClassName('popup-content')[0].innerHTML = this.getPopupMarkup(feature);    
        popup.setPosition(coordinates);
      } else if (this.clickToClose(evt.originalEvent)) {
        popup.setPosition(undefined);
      }
    }); 
    
    // cambiar cursor al pasar sobre los iconos del mapa
    this.Map.on('pointermove', (e) => {
      if (e.dragging) {
        return;
      }
      var pixel = this.Map.getEventPixel(e.originalEvent);
      var hit = this.Map.hasFeatureAtPixel(pixel);
      let mapElement = (<HTMLElement>this.Map.getTargetElement());

      if (mapElement.style) {
        mapElement.style.cursor = hit ? 'pointer' : '';
      }
    });
  }

  private clickToClose(event: any): boolean {
    // Si path contiene popup
    //event.path

    for (const el of event.path) {
      // Si se hace click en cerrar
      if (el && el.classList && el.classList.contains('ol-popup-closer')) {
        return true;
      } else if (el.id === 'popup') {
        return false;
      }
    }

    return true;
  }

  private getPopupMarkup(feature: any): string {
    let content = `<h2>${feature.get('name')}`;

    content += !feature.get('mylocation') ? ` (${feature.get('altitud')}m)` : '';
    content += '</h2>';

    if (!feature.get('mylocation')) {
      content += `<p>Techo de: ${feature.get('concejo')}</p>`;
      content += `<p>Dificultad: ${feature.get('dificultad')}</p>`;
      content += `<p>Coordenadas: ${feature.get('coordenadas')}</p>`;
      content += `<p>Ascendido: ${feature.get('ascendido')}</p>`;
      content += `<a href="#/detalle/${feature.get('id')}">+ Más info</a>`;
    }

    return content;
  }

  ngOnDestroy() {
    this.sm.removeAllSubscriptions();
  }

  userLocationReceived(coords: any) {
    let features: Feature[] = [new Feature({
      geometry: new Point(olProj.fromLonLat([ coords.longitude, coords.latitude])),
      name: 'Tú',
      mylocation: true
    })];

    var iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 40],
        anchorXUnits: IconAnchorUnits.FRACTION,
        anchorYUnits: IconAnchorUnits.PIXELS,
        src: `${environment.baseHref}/assets/img/userlocation.svg`,
      }),
    });

    features[0].setStyle(iconStyle);
  
    let vectorSource = new VectorSource({
      features: features,
    });
  
    this.vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    this.Map.addLayer(this.vectorLayer);
  }
}
