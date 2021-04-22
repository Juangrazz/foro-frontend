import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AbstractControl, ValidatorFn, ValidationErrors, FormControl } from '@angular/forms';

import keys from 'src/global/keys';
import * as moment from 'moment';
import { CommentModel } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class ControlService {

  showNavAndFoot = new BehaviorSubject<boolean>(true);
  isAdmin = new BehaviorSubject<boolean>(false);

  constructor() { }

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

      if (diff <= 0) valid = true;

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

  commentsFormatter(comments: CommentModel[]): CommentModel[] {
    comments.forEach(comment => {
      let words = comment.comment.split(" ");
      let finalString = "";
      words.forEach(word => {
        if (word.charAt(0) === "@") {
          let match = word.match(keys.ctrl_instagram_pattern);
          let lastCharacters = word.replace(match![0], "").replace("@", "");
          finalString += `<a href="https://instagram.com/${match![0]}/" class="red-link">@${match![0]}</a>${lastCharacters} `
        } else {
          finalString += word + " ";
        }
      });
      comment.comment = finalString.trim();
    });
    return comments;
  }

  commentToSendFormatter(comment: string): string{
      let words = comment.split(" ");
      let finalString = "";
      words.forEach(word => {
        if (word.charAt(0) === "@" && word.length > 1) {
          let match = word.match(keys.ctrl_instagram_pattern);
          let lastCharacters = word.replace(match![0], "").replace("@", "");
          finalString += `<p class="txt-red">@${match![0]}</p>${lastCharacters} `
        } else {
          finalString += word;
        }
      });
      comment = finalString;
    return comment;
  }
  
}
