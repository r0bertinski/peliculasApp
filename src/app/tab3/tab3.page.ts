import { Component, OnInit } from '@angular/core';
import { PeliculaDetalle, Genre } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  movies: PeliculaDetalle [] = [];
  genres: Genre[] = [];
  favoriteByGenre = [];

  constructor( private dataLocal: DataLocalService,
               private movieService: MoviesService) {}

  /*
  ionViewWillEnter:
  It’s fired when entering a page, before it becomes the active one. 
  Use it for tasks you want to do every time you enter in the view (setting event listeners, updating a table, etc.).
  */

  async ionViewWillEnter() {
    this.genres = await this.movieService.loadGenres();
    this.moviesByGenre();
    this.movies = await this.dataLocal.loadFavorites();
  }

  moviesByGenre() {

    this.favoriteByGenre = [];

    this.genres.forEach(genre => {
      this.favoriteByGenre.push({
        genre: genre.name,
        movies: this.movies.filter( movie => {
          return movie.genres.find( genre => genre.id === genre.id );
        })
      });
    });
  }


}
