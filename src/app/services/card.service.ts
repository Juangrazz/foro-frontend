import { Injectable } from '@angular/core';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  individualCard: any = {};
  dateToShow!: string;

  constructor() {
      this.individualCard = JSON.parse(sessionStorage.getItem("individual_card") || "{}");
      this.dateToShow = JSON.parse(sessionStorage.getItem("date_to_show") || `"${moment().format("DD-MM-YYYY")}"`);
  }

}
