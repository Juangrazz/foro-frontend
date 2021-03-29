import { Injectable } from '@angular/core';
import { CardModel } from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  disabledCommentsLink: boolean = false;

  cards: CardModel[] = [
    {
      date: "12/03/1995",
      publicationDate: "07/11/2021",
      time: "16:00",
      place: "Gran casa",
      instagram: "Anónimo",
      description: "Chica en el 100 mon de Goya (23 de marzo) con pelo largo, castaño, sudadera marrón, pitillos negros y vans negras altas. Estabas sentada con unas amigas en una mesa al lado de un árbol, le has gustado a mi amigo. Si lo ves, comenta con ♥",
      comments: 12
    },
    {
      date: "16/11/1990",
      publicationDate: "08/11/2021",
      time: "12:00",
      place: "Parque venecia",
      instagram: ".antonella",
      description: "Una descripción muy larga otra vez",
      comments: 8
    }
  ];

  individualCard: CardModel = new CardModel();

  constructor() {
    this.individualCard = JSON.parse(sessionStorage.getItem("individual_card") || "{}");
  }
}
