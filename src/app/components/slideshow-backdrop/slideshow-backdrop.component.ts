import { Component, OnInit, Input } from '@angular/core';
import { Pelicula } from '../../interfaces/interfaces';
import { ModalController, IonRouterOutlet } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent implements OnInit {

  @Input() movies: Pelicula[] = [];
  
  slideOpts = {
    slidesPerView: 1.1,
    freeMode: true
  };
  constructor(private modalCtl: ModalController,
              private routerOutlet: IonRouterOutlet) { }

  ngOnInit() {}

  async seeDetails( id: string ) {

    const modal = await this.modalCtl.create({
      component: DetalleComponent,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {
       // id: id
      // forma abreviada de ECmaScript6
        id
      }
    });
    modal.present();
  }


}
