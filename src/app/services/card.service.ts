import { Injectable } from '@angular/core';
import { CardModel } from '../models/card.model';
import { AbstractControl, ValidatorFn, ValidationErrors, FormControl } from '@angular/forms';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  cards: CardModel[] = [];
  individualCard: CardModel = new CardModel();

  constructor() {
      this.individualCard = JSON.parse(sessionStorage.getItem("individual_card") || "{}");
  }

  validateDate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      let date = moment(control.value);
      let now = moment().format("YYYY-MM-DD");
      let diff = date.diff(now, 'days');
      let valid = false;

      if (diff > 0) valid = true;

      return valid ? { dateValid: true } : null;
    }
  }

  countCharacters(control: AbstractControl): number {
    return control.value.length;
  }

}
