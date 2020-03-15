import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  novedades: Pelicula[] = [];
  populars:  Pelicula[] = [];
  
  constructor( private MoviesSrv: MoviesService) {}


  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    this.MoviesSrv.getFeature()
                   .subscribe( resp => {
                    this.novedades = resp.results;
                    console.log('novedades', this.novedades[0]);        
                   });

    this.MoviesSrv.getPopulars()
                   .subscribe( resp => {
                     this.populars = resp.results;
                     console.log('populars', this.populars);
                   })
  }
}
