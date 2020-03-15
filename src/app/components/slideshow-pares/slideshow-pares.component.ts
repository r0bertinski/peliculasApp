import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pelicula } from '../../interfaces/interfaces';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {

  // Recibir
  @Input() pairsOfMovies: Pelicula[] = [];

  // Emitir
  @Output() loadMore = new EventEmitter();

  slideOpts = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -10

  };

  constructor() { }

  ngOnInit() {}

  onClick() {
    this.loadMore.emit();
  }

}
