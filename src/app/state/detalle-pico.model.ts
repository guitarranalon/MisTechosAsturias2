export interface InicioRuta {
  nombre: string;
  latitud: number;
  longitud: number;
  altura: number;
}

export interface DetallePico {
  inicioRuta: InicioRuta;
  ascendidoCon: number[];
  ubicacion: string;
}

/**
 * A factory function that creates DetallePico
 */
export function createDetallePico(params: Partial<DetallePico>) {
  return {
    ...params
  } as DetallePico;
}
