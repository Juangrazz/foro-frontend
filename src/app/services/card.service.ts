import { Injectable } from '@angular/core';
import { CardModel } from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  cards: CardModel[] = [
    {
      fecha: "12/03/1995",
      hora: "16:00",
      lugar: "Gran casa",
      instagram: "pepe",
      descripcion: "Una descripción muy larga",
      comentarios: 12
    },
    {
      fecha: "16/11/1990",
      hora: "12:00",
      lugar: "Parque venecia",
      instagram: ".antonella",
      descripcion: "Una descripción muy larga otra vez",
      comentarios: 8
    }
  ];

  constructor() { }
}
