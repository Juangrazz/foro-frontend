import { Injectable } from '@angular/core';
import { CommentModel } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  comments: CommentModel[] = [
    {
      user: "Pepe",
      comment: "Soy yo... jejeje"
    },
    {
      user: "Anónimo",
      comment: "Creo que puede ser @tito, no @pepe"
    },
    {
      user: "Anónimo",
      comment: "Vaya pringao jajaja"
    },
    {
      user: "Doradito",
      comment: "@Lokito_Ken? no serás tu?"
    },
    {
      user: "Pepe",
      comment: "@Ivan????"
    },
    {
      user: "Anónimo",
      comment: "Seguro que es @felipe_gonsales__, o quizás @Camaron..."
    }
  ];

  constructor() { }

  // TODO: cmabiar algoritmo por patron ^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$
  commentsFormatter() {
    this.comments.forEach(comment => {
      let words = comment.comment.split(" ");
      let finalString = "";
      words.forEach(word => {
        if (word.charAt(0) === "@") {
          let lastCharacters = "";
          let pos = word.length;
          for (let i = word.length; i > 0; i--) {
            let charCode = word.charAt(i - 1).toUpperCase().charCodeAt(0);
            let char = word.charAt(i - 1);
            if (char !== "_" && (charCode < 65 || charCode > 90)) {
                lastCharacters = char + lastCharacters;
                pos = i-1;
            } else {
              break;
            }
          }
          finalString += `<a href="https://instagram.com/${word.slice(1, pos)}/" class="red-link">${word.slice(0, pos)}</a>${lastCharacters} `
        } else {
          finalString += word + " ";
        }
      });
      comment.comment = finalString.trim();
    });
  }
}
