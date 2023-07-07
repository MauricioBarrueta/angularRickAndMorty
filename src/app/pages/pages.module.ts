import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { CharactersComponent } from './characters/characters.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    CharactersComponent,    
    HeaderComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CharactersComponent,    
    HeaderComponent
  ]
})
export class PagesModule { }
