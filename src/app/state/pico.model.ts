import { ID } from '@datorama/akita';

export interface Pico {
  id: ID;
  nombre: string;
  concejo: string;
  altura: number;
  dificultad: number;
  latitud: number;
  longitud: number;
  alternativas?: object;
  ascendido?: boolean;
}

/**
 * A factory function that creates Picos
 */
export function createPico(params: Partial<Pico>) {
  return {
    ...params,
    ascendido: false
  } as Pico;
}
