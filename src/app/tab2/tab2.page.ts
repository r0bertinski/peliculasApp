import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { DetalleComponent } from '../components/detalle/detalle.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar = '';
  ideas: string[] = ['Spiderman', 'Avenger', 'El señor de los anillos', 'la vida es bella'];
  movies: Pelicula[] = [];
  searching = false;

  constructor( private moviesCtrl: MoviesService,
               private modalCtl: ModalController) {}

  // ngOnInit() {}

  search(event) {
    if(event.detail.value.length === 0) {
      this.movies = [];
      return;
    }
    this.searching = true;
    this.moviesCtrl.searchMovie(event.detail.value)
                    .subscribe( resp => {
                      this.movies = resp.results;
                      this.searching = false;
                    });
    console.log( event.detail.value );
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
