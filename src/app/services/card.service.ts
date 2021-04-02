import { Injectable } from '@angular/core';
import { CardModel } from '../models/card.model';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  cards: CardModel[] = [];

  individualCard: CardModel = new CardModel();

  constructor(private databaseService: DatabaseService) {
      this.individualCard = JSON.parse(sessionStorage.getItem("individual_card") || "{}");
  }

}
