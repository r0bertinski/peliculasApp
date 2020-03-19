import { Pipe, PipeTransform } from '@angular/core';
import { PeliculaDetalle, Genre } from '../interfaces/interfaces';

@Pipe({
  name: 'genre'
})
export class GenrePipe implements PipeTransform {

  movies: PeliculaDetalle[] = [];
  transform(movies: PeliculaDetalle[], CurrentgenreId: any): any {
       this.movies = movies.filter( movie => {
        return movie.genres.find( genre => genre.id === CurrentgenreId );
    });
       return this.movies;
  }
}
