import { Injectable } from '@angular/core';
import { CommentModel } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  comments: CommentModel[] = [
    {
      user:"Pepe",
      comment:"Soy yo... jejeje"
    },
    {
      user:"Anónimo",
      comment:"Creo que puede ser @tito, no @pepe"
    }
  ];

  constructor() {}

  commentsFormatter(){
    this.comments.forEach(comment => {
      let words = comment.comment.split(" ");
      let finalString = "";
      words.forEach(word => {
        if(word.charAt(0) === "@"){
          finalString += `<a href="https://instagram.com/${word}/" class="blue_link">${word}</a> `
        } else {
          finalString += word + " ";
        }
      });
      comment.comment = finalString.trim();
    });
  }
}
