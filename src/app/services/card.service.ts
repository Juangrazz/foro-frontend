import { Injectable } from '@angular/core';
import { CardModel } from '../models/card.model';
import { AbstractControl, ValidatorFn, ValidationErrors, FormControl } from '@angular/forms';

import * as moment from 'moment';
import keys from 'src/keys';

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

  validateDate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      let date = moment(value);
      let now = moment().format("YYYY-MM-DD");
      let diff = date.diff(now, 'days');
      let valid = false;

      if (diff < 0) valid = true;

      return valid ? null: { dateValid: false };
    }
  }

  validateInstagram(): ValidatorFn {
    
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      let valid = false;

      if (!value) {
        return null;
      }

      let match = value.match(keys.ctrl_instagram_pattern);

      if(match === null || match![0] !== value) valid = false; else valid = true;
      
      return valid ? null : { instaValid: false };
    }
  }

  countCharacters(control: AbstractControl): number {
    return control.value.length;
  }

}
