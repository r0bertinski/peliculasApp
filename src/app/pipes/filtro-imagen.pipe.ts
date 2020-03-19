import { Pipe, PipeTransform } from '@angular/core';
import { PeliculaDetalle } from '../interfaces/interfaces';

@Pipe({
  name: 'filtroImagen'
})
export class FiltroImagenPipe implements PipeTransform {

  transform( movies: PeliculaDetalle[]): any {

    return movies.filter( movie => {
      return movie.backdrop_path;
    });
  }

}
