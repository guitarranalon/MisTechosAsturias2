import { Pipe, PipeTransform } from '@angular/core';

enum NivelDificultad {
  FACIL = "Fácil",
  MEDIA = "Media",
  ALTA = "Alta"
}

@Pipe({
  name: 'dificultad'
})
export class DificultadPipe implements PipeTransform {

  transform(value: number): string {

    // Precondición
    if (!value) return value.toString();

    switch (value) {
      case 1:
        return NivelDificultad.FACIL;

      case 2:
        return NivelDificultad.MEDIA;

      case 3:
        return NivelDificultad.ALTA;

      default:
        return value.toString();
    }
  }

}
