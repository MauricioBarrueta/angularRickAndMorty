import { Component, OnInit } from '@angular/core';
import { CharacterService } from './service/character.service';
import { catchError, tap, throwError } from 'rxjs';
import { Character } from './interface/character';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {

  constructor(private readonly characterService: CharacterService) { }

  inputValue!: string
  characters$!: Character[]
  page: number = 1   

  alertText!: string
  
  ngOnInit(): void {
   this.getCharactersByPage()    
  }

  /* Lista de personajes por página */
  getCharactersByPage(): void {
    this.alertText = ''
    this.characterService.getCharactersList(this.page)
      .pipe(
        catchError(error => {
          if (error.status === 404) {
            this.page--
            this.alertText = 'Parece que has llegado a la última página'
          }
          return throwError(() => error)
        }),
        tap((res: Character[]) => { this.characters$ = res })
      )
      .subscribe();
  }

  /* Obtiene el valor del form */
  getValueFromInput(input: string): void {
    this.inputValue = input
    this.getCharacterByName()
    if(this.inputValue.length == 1) {
      this.getCharactersByPage()
    }
  }

  /* Filtrar personajes por nombre */
  getCharacterByName() {
    this.alertText = ''
    this.characterService.getCharacterByName(this.page, this.inputValue)
    .pipe(
      catchError(error => {
        if (error.status === 404) {
          this.page = 1
          this.getCharactersByPage()
          this.alertText = 'Ningún resultado coincide con este nombre'
        }
        return throwError(() => error)
      }),
      tap((res: Character[]) => { this.characters$ = res })
    )
    .subscribe();
  }

  /* Página siguiente */
  nextPage() {
    this.page++
    this.getCharactersByPage()    
  }

  /* Página anterior */
  prevPage() {
    if(this.page > 1) {
      this.page--
      this.getCharactersByPage()
    }  
  }

  /* Resetear la lista */
  resetList() {
    this.page = 1
    this.getCharactersByPage()
  }
}
