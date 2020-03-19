import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pelicula } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {

  // Recibir
  @Input() movies: Pelicula[] = [];
  
  // Emitir
  @Output() loadMore = new EventEmitter();

  slideOpts = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -10

  };

  constructor( private modalCtl: ModalController ) { }

  ngOnInit() {}

  onClick() {
    this.loadMore.emit();
  }


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
