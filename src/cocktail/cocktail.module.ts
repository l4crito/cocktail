import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CocktailRoutingModule } from './cocktail-routing.module';
import { CocktailComponent } from './cocktail.component';
import { MaterialModule } from 'src/material/material.module';


@NgModule({
  declarations: [
    CocktailComponent
  ],
  imports: [
    CommonModule,
    CocktailRoutingModule,
    MaterialModule
  ]
})
export class CocktailModule { }
