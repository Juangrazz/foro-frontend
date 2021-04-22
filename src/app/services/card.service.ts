import { Injectable } from '@angular/core';

import * as moment from 'moment';
import { CardModel } from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  individualCard: any = {};
  dateToShow!: string;
  normalSearch: CardModel[] = [];

  constructor() {
      this.individualCard = JSON.parse(sessionStorage.getItem("individual_card") || "{}");
      this.dateToShow = JSON.parse(sessionStorage.getItem("date_to_show") || `"${moment().format("DD-MM-YYYY")}"`);
      this.normalSearch = JSON.parse(sessionStorage.getItem("normal_search") || "[]");
  }

}
