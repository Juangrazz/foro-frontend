import { Injectable } from '@angular/core';

import * as moment from 'moment';
import keys from 'src/global/keys';
import { CardModel } from '../models/card.model';
import { MymyvCardModel } from '../models/mymyv_card.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  keys = keys;

  individualCard: any = {};
  dateToShow!: string;
  normalSearch: CardModel[] = [];
  mymyvSearch: MymyvCardModel[] = [];

  constructor(private storageService: StorageService) {
    this.getSessionStorageValues();
  }

  getSessionStorageValues(){

    if(this.storageService.getEncryptSessionValue(keys.session_storage_individual_card) !== null){
      this.individualCard = this.storageService.getEncryptSessionValue(keys.session_storage_individual_card);
    } else {
      this.individualCard = {};
    }

    this.dateToShow = JSON.parse(sessionStorage.getItem(keys.session_storage_date_to_show) || `"${moment().format("DD-MM-YYYY")}"`);
  }

}
