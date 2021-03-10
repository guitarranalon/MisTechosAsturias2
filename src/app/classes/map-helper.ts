import { Pico } from "../state/pico.model";
import { Feature } from "ol";
import Point from 'ol/geom/Point';
import * as olProj from 'ol/proj';
import { DecimalPipe } from "@angular/common";
import { DificultadPipe } from "../pipes/dificultad.pipe";
import { Utils } from "./utils";

export class MapHelper {
    constructor (
        private decimalPipe: DecimalPipe,
        private dificultadPipe: DificultadPipe
    ) {

    }

    public createFeature(pico: Pico): Feature {
        return new Feature({
            geometry: new Point(olProj.fromLonLat([pico.longitud, pico.latitud])),
            name: pico.nombre,
            altitud: this.decimalPipe.transform(pico.altura, '3.0-1', 'es'),
            concejo: pico.concejo,
            dificultad: this.dificultadPipe.transform(pico.dificultad),
            coordenadas: `${pico.latitud}, ${pico.longitud}`,
            ascendido: pico.ascendido ? Utils.si : Utils.no,
            id: pico.id
        });
    }

    public createFeatureSalida(pico: Pico): Feature {
        if (!pico.detalle) return new Feature();

        return new Feature({
            geometry: new Point(olProj.fromLonLat([pico.detalle.inicioRuta.longitud, pico.detalle.inicioRuta.latitud])),
            name: pico.detalle.inicioRuta.nombre,
            altitud: pico.detalle.inicioRuta.altura
        });
    }
}
