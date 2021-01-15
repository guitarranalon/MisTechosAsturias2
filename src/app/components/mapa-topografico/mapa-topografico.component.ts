import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import {View, Map, Feature } from 'ol';
import { ScaleLine, defaults as DefaultControls} from 'ol/control';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import * as olProj from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import {Icon, Style} from 'ol/style';
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

@Component({
  selector: 'app-mapa-topografico',
  templateUrl: './mapa-topografico.component.html',
  styleUrls: ['./mapa-topografico.component.scss']
})
export class MapaTopograficoComponent implements OnInit, AfterViewInit {

  Map: Map;
  view: View;
  picos: Pico[] = [];
  @ViewChild("popup") popup: ElementRef;

  constructor(
    private zone: NgZone, 
    private cd: ChangeDetectorRef,
    private picosQuery: PicosQuery,
    private decimalPipe: DecimalPipe,
    private dificultadPipe: DificultadPipe ) { }

  ngOnInit() {
    this.picos = this.picosQuery.getAll();
  }

  ngAfterViewInit():void {
    if (! this.Map) {
      this.zone.runOutsideAngular(() => this.initMap())
    } 
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
      let iconFeature = this.createFeature(pico);
      iconFeature.setStyle(pico.ascendido ? iconStyleAscendido : iconStyle);
      features.push(iconFeature);
    }
    
    var vectorSource = new VectorSource({
      features: features,
    });
    
    var vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    this.Map.addLayer(vectorLayer);
  }
  
  private createFeature(pico: Pico): Feature {
    return new Feature({
      geometry: new Point(olProj.fromLonLat([ pico.longitud, pico.latitud])),
      name: pico.nombre,
      altitud: this.decimalPipe.transform(pico.altura, '3.0-1', 'es'),
      concejo: pico.concejo,
      dificultad: this.dificultadPipe.transform( pico.dificultad ),
      coordenadas: `${pico.latitud}, ${pico.longitud}`,
      ascendido: pico.ascendido ? Utils.si : Utils.no
    });
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
        return feature;
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
    let content = `<h2>${feature.get('name')} (${feature.get('altitud')}m)</h2>`;

    content += `<p>Techo de: ${feature.get('concejo')}</p>`;
    content += `<p>Dificultad: ${feature.get('dificultad')}</p>`;
    content += `<p>Coordenadas: ${feature.get('coordenadas')}</p>`;
    content += `<p>Ascendido: ${feature.get('ascendido')}</p>`;

    return content;
  }
}
