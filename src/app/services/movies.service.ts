import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaMDB } from '../interfaces/interfaces';

// El servicio ya se inyecta automatocamente en el root
@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor( private http: HttpClient) { }

  getFeature(){
    // tslint:disable-next-line:max-line-length
    return this.http.get<RespuestaMDB>(' https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2020-01-15&primary_release_date.lte=2020-03-02&api_key=77d41f30ec62487bc0f3553fec88e0d4&language=es&include_image_language=es');
  }
}
