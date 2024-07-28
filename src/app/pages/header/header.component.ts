import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  template: `
    <header>
      <a href="https://rickandmortyapi.com/documentation" target="_blank">Rick and Morty Wiki</a>
      <div class="container">
        <form>
            <input class="form-control" type="text" name="input" [formControl]="value" autocomplete="off"
              placeholder="Ingresa el nombre del personaje que buscas, los resultados se mostrarán automáticamente:">
        </form>        
      </div>
    </header>
  `,
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {  

  constructor() {}
  
  value = new FormControl('')
  @Output() valueEmitter = new EventEmitter<string>()

  imgPath: string = `${environment.imgPath}`
  
  ngOnInit(): void {
    this.getInputValue()
  }

  /* Obtiene el valor del input y lo manda al componente */
  getInputValue(): void {   
    this.value.valueChanges   
      .pipe(
        map((value) => value?.toString().trim()),
        debounceTime(400),
        distinctUntilChanged(),
        // filter((value) => value !== ''),        
        tap((value) => this.valueEmitter.emit(value))
      )
      .subscribe();    
  }
}