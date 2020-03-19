import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { ParesPipe } from './pares.pipe';
import { GenrePipe } from './genre.pipe';
import { FiltroImagenPipe } from './filtro-imagen.pipe';



@NgModule({
  declarations: [ImagenPipe, ParesPipe, GenrePipe, FiltroImagenPipe],

  // Tenemos que esperotarlo para usarlo fuera del modulo pipes.
  exports: [
    ImagenPipe,
    ParesPipe,
    GenrePipe,
    FiltroImagenPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
