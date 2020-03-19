import { Component, OnInit, Input } from '@angular/core';
import { Pelicula } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {

  @Input() movies: Pelicula[] = [];
  slideOpts = {
    slidesPerView: 3.3,
    freeMode: true
  };
  constructor( private modalCtl: ModalController ) { }

  ngOnInit() {}

  async seeDetails( id: string ) {

    const modal = await this.modalCtl.create({
      component: DetalleComponent,
      componentProps: {
       // id: id
      // forma abreviada de ECmaScript6
        id
      }
    });
    modal.present();
  }

}
