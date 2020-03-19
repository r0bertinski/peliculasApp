import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaMDB, PeliculaDetalle, PeliculaCreditos } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';
import { Genre } from '../interfaces/interfaces';

const apiKey = environment.apiKey;
const URL = environment.url;

// El servicio ya se inyecta automatocamente en el root
@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularsPage = 0;
  genres: Genre[] = [];

  constructor( private http: HttpClient) { }

  private executeQuery<T>( query: string ) {
    return this.http.get<T>(`${URL}/${query}&api_key=${apiKey}&language=es&include_image_language=es`);
  }

  getPopulars() {
    this.popularsPage++;
    return this.executeQuery<RespuestaMDB>(`discover/movie?sort_by=popularity.desc&page${ this.popularsPage }`);

  }
  getFeature() {

    //  current date and time
    const today = new Date();

    // Get last day of the current month.
    const lastDay = new Date( today.getFullYear(), today.getMonth() - 1, 0).getDate();
    const month = today.getMonth() + 1;
    let monthString;

    if ( month < 10) {
      monthString = '0' + month;
    } else {
      monthString = month;
    }

    const start = `${ today.getFullYear() }-${ monthString }-01`;
    const end = `${ today.getFullYear() }-${ monthString }-${lastDay}`;

    // tslint:disable-next-line:max-line-length
    return this.executeQuery<RespuestaMDB>(`discover/movie?primary_release_date.gte=${ start }&primary_release_date.lte=${ end }`);
  }

  getMovieDetails( id: string ) {
    
    //a = 1 es solo para que funcione al enviarla a executeQuery.
    return this.executeQuery<PeliculaDetalle>(`movie/${id}?a=1`); 
  }

  getMovieCredits( id: string ) {
    return this.executeQuery<PeliculaCreditos>(`movie/${id}/credits?a=1`);
  }

  getCastMovie( id: string ) {
    return this.executeQuery<PeliculaCreditos>(`movie/${id}/credits?a=1`);

  }

  searchMovie( query: string ) {
    return this.executeQuery<RespuestaMDB>(`search/movie?query=${query}`);
  }

  loadGenres(): Promise<Genre[]> {

    return new Promise( resolve => {

        this.executeQuery<Genre[]>(`genre/movie/list?a=1`)
        .subscribe(  resp  => {
          console.log( resp );

          this.genres = resp['genres'];
          resolve(this.genres);
          // console.log( this.genres );
        });

      });
  }
}
