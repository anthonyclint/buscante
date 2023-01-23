import { LivrosResultado } from './../../models/interfaces';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Item, Livro } from 'src/app/models/interfaces';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy{

  listaLivros: Livro[];
  campoBusca = '';
  subscricao: Subscription;
  livro: Livro;

  constructor(
    private livroService: LivroService
  ) { }

  buscarLivros(){
    this.subscricao = this.livroService.buscar(this.campoBusca)
    .subscribe({
      next: (items) => this.listaLivros = this.livrosResultadoParaLivros(items),
      error: (erro) => console.error(erro)
    }
    )
  }

livrosResultadoParaLivros(items): Livro[]{
  const livros: Livro[] = [];

  items.forEach(item => {
    livros.push(this.livro = {
      title: item.volumeInfo?.title,
      authors: item.volumeInfo?.authors,
      publisher: item.volumeInfo?.publisher,
      publishedDate: item.volumeInfo?.publishedDate,
      description: item.volumeInfo?.description,
      previewLink: item.volumeInfo?.previewLink,
      thumbnail: item.volumeInfo?.imageLinks?.thumbnail
    })
  })

  return livros;
}

  ngOnDestroy(): void {
    this.subscricao.unsubscribe();
  }
}



