import { Injectable } from '@angular/core';

import { CardModel } from '../models/card.model';
import { PeopleCardModel } from '../models/people_card.model';

import { StorageService } from './storage.service';

import * as moment from 'moment';
import keys from 'src/global/keys';


@Injectable({
  providedIn: 'root'
})
export class CardService {

  keys = keys;

  individualCard: any = {};
  dateToShow!: string;
  normalSearch: CardModel[] = [];
  peopleSearch: PeopleCardModel[] = [];
  newPlace: string = "";

  constructor(private storageService: StorageService) {
    this.getSessionStorageValues();
  }

  getSessionStorageValues(){

    if(this.storageService.getEncryptSessionValue(keys.session_storage_individual_card) !== null){
      this.individualCard = this.storageService.getEncryptSessionValue(keys.session_storage_individual_card);
    } else {
      this.individualCard = {};
    }
    
    this.dateToShow = JSON.parse(this.storageService.getSessionValue(keys.session_storage_date_to_show) || `"${moment().format("DD-MM-YYYY")}"`);
  }

}
