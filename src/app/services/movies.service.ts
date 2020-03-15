import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaMDB } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const URL = environment.url;

// El servicio ya se inyecta automatocamente en el root
@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor( private http: HttpClient) { }

  private executeQuery<T>( query: string ) {
    console.log(`${URL}/${query}&api_key=${apiKey}&language=es&include_image_language=es`);
    return this.http.get<T>(`${URL}/${query}&api_key=${apiKey}&language=es&include_image_language=es`);

  }

  getPopulars() {
    return this.executeQuery<RespuestaMDB>(`discover/movie?sort_by=popularity.desc`);

  }
  getFeature() {

    //  current date and time
    const today = new Date();

    console.log('today', today);

    // Get last day of the current month.
    const lastDay = new Date( today.getFullYear(), today.getMonth() - 1, 0).getDate();
    console.log('lastDay', lastDay);

    const month = today.getMonth() + 1;

    console.log('mes', month);
    let monthString;

    if ( month < 10) {
      monthString = '0' + month;
    } else {
      monthString = month;
    }

    const start = `${ today.getFullYear() }-${ monthString }-01`;
    console.log('start', start);

    const end = `${ today.getFullYear() }-${ monthString }-${lastDay}`;
    console.log('end', end);


    // tslint:disable-next-line:max-line-length
    return this.executeQuery<RespuestaMDB>(`discover/movie?primary_release_date.gte=${ start }&primary_release_date.lte=${ end }`);
  }
}
