import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/material/material.module';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    ListRoutingModule,
    FormsModule,
    MaterialModule
  ]
})
export class ListModule { }
