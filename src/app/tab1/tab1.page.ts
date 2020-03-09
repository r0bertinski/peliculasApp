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
  slideOpts = {
    slidesPerView: 1.1,
    freeMode: true
  };
  constructor( private MoviesCtrl: MoviesService) {}


  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    this.MoviesCtrl.getFeature()
                   .subscribe( resp => { 
                    this.novedades = resp.results;
                    console.log('novedades', this.novedades[0] );
                   });

  }
}
