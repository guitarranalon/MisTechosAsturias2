import { AfterViewInit, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
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
import { PicosQuery } from 'src/app/state/picos.query';
import { Pico } from 'src/app/state/pico.model';

@Component({
  selector: 'app-mapa-topografico',
  templateUrl: './mapa-topografico.component.html',
  styleUrls: ['./mapa-topografico.component.scss']
})
export class MapaTopograficoComponent implements OnInit, AfterViewInit {

  Map: Map | undefined;
  view: View | undefined;
  picos: Pico[] | undefined;

  constructor(
    private zone: NgZone, 
    private cd: ChangeDetectorRef,
    private picosQuery: PicosQuery ) { }

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
    var iconFeature = new Feature({
      geometry: new Point(olProj.fromLonLat([-6.660072, 43.269427])),
      name: 'Tocino Island',
      population: 4000,
      rainfall: 500,
    });
    
    var iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 46],
        anchorXUnits: IconAnchorUnits.FRACTION,
        anchorYUnits: IconAnchorUnits.PIXELS,
        src: 'assets/img/pinMapa.png',
      }),
    });
    
    iconFeature.setStyle(iconStyle);
    
    var vectorSource = new VectorSource({
      features: [iconFeature],
    });
    
    var vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    this.Map.addLayer(vectorLayer);
  }  
}
