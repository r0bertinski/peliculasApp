import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PeliculaDetalle } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  movies: PeliculaDetalle[] = [];
  
  constructor( private storage: Storage,
               private toastCtrl: ToastController) { 

                this.loadFavorites();
               }


  async presentToast( msg: string ) {
        const toast = await this.toastCtrl.create({
          message: msg,
          duration: 1500
        });
        toast.present();
  }

  saveMovie( movie: PeliculaDetalle ) {

    console.log('movie', movie);
    let exists = false;
    let msg = '';

    // Check if the movie we are trying to add to favorites storage already exists.
    for (const saveMovie of this.movies) {
      if ( movie.id === saveMovie.id) {
        exists = true;
        break;
      }
    }

    // If the user click in favorites button, and the movie has been already added before, it will be removed from favorites storage.
    // movieSaved are the movies in the local storage
    if ( exists ){
      this.movies = this.movies.filter( movieSaved => movieSaved.id !== movie.id );
      msg = `${movie.title} removed from favorites`;
    } else {
      this.movies.push( movie );
      msg = `${movie.title} added to favorites`;
    }

    this.storage.set('movies', this.movies);
    this.presentToast( msg );

    return !exists;
  }

  async loadFavorites() {

    // It returns a promisse from storage.set().
    const storageMovies = await this.storage.get('movies');
    this.movies = storageMovies || []; // If not movies in storage, it returns an empty array.
    return this.movies;
  }

  // Return a promisse.
  async movieExists( id ) {

    await this.loadFavorites();
    const exists = this.movies.find( movieSaved => movieSaved.id === id);

    return (exists) ? true : false;
  }




}
