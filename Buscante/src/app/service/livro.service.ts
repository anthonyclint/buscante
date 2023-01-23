import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

import { Item, LivrosResultado } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly API = 'https://www.googleapis.com/books/v1/volumes';
  //https://www.googleapis.com/books/v1/volumes?q=search+terms URL original

  constructor(
    private http: HttpClient
  ) { }

  buscar(digitado: string): Observable<Item[]> {
    const params = new HttpParams().append('q', digitado);

    return this.http.get<LivrosResultado>(this.API, { params: params })
      .pipe(
        tap( (retornoAPI) => console.log(retornoAPI) ),
        map(resultado => resultado.items),
        tap(resultado => console.log('Fluxo após o map', resultado))
      )
  }
}
