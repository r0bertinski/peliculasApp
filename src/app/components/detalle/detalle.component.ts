import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { PeliculaDetalle, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input()  id: string;

  movie: PeliculaDetalle;
  casting: Cast[] = [];
  hide = 150;
  starIcon = 'star-outline';
  slideOptCast = {
    slidesPerView: 3.3,
    freeMode: true,
    spacebetween: -5
  };

  constructor( private moviesService: MoviesService,
               private modalCtrl: ModalController,
               private dataLocal: DataLocalService,
               private router: Router,
               private activatedRoute: ActivatedRoute) { }

  async ngOnInit() {


    this.dataLocal.movieExists( this.id )
        .then( exist => this.starIcon = (exist) ? 'star' : 'star-outline' );

    this.moviesService.getMovieDetails( this.id )
                      .subscribe( resp => {
                        console.log( resp );
                        this.movie = resp;
                      });

    this.moviesService.getMovieCredits( this.id )
                      .subscribe( resp => {
                        console.log( resp );
                        this.casting = resp.cast;
                      });
  }

  back() {
    this.router.navigate(['/tabs/tab3'], {
      queryParams: {refresh: new Date().getTime()}
   });
    this.modalCtrl.dismiss();
  }
  
  favorite() {
    const exist = this.dataLocal.saveMovie( this.movie );
    this.starIcon = (exist) ? 'star' : 'star-outline';
  }

}
