import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character, Info } from '../interface/character';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';

export interface apiResponse {
  info: Info;
  results: Character[];
}

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private readonly http: HttpClient) { }

  /* Obtiene todos los personajes por cada página */
  getCharactersList(page: number): Observable<Character[]> {
    return this.http.get<apiResponse>(`${environment.url}/character/?page=${page}`)      
      .pipe(
        map((res: apiResponse) => {
          page = res.info.pages;
          return res.results                
        })            
      )      
  }

  /* Obtiene los personajes de acuerdo al nombre */
  getCharacterByName(page: number, name: string): Observable<Character[]> {
    return this.http.get<apiResponse>(`${environment.url}/character/?page=${page}&name=${name}`)
      .pipe(map((res: apiResponse) => {
          page = res.info.pages;
          return res.results
        })
      )
  }  
}
/**
*! OPERADORES:
** pipe(): Permite aplicar varios operadores sobre el flujo de datos (Observable) de forma secuencial
** map(): Aplica una función de proyección a cada valor y emite dicha proyección en el Observable resultante
*/