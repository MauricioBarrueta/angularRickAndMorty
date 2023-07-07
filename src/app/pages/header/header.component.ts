import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, tap } from 'rxjs';

@Component({
  selector: 'app-header',
  template: `
    <header>
      <h2>Rick and Morty Wiki</h2>
      <div class="container">
        <form>
            <input class="form-control" type="text" name="input" [formControl]="value" placeholder="Nombre del personaje: &#xf304;" 
              autocomplete="off">
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
        filter((value) => value !== ''),        
        tap((value) => this.valueEmitter.emit(value))
      )
      .subscribe();    
  }
}