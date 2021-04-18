import { Injectable } from '@angular/core';
import keys from 'src/keys';
import { CommentModel } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor() { }

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

    debugger;
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
