import { Injectable } from '@angular/core';
import keys from 'src/keys';
import { CommentModel } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  comments: CommentModel[] = [
    {
      user: "Pepe",
      comment: "Soy yo... jejeje",
      publication_date: "04-04-2021"
    },
    {
      user: "Anónimo",
      comment: "Creo que puede ser @tito, no @pepe",
      publication_date: "04-04-2021"
    },
    {
      user: "Anónimo",
      comment: "Vaya pringao jajaja",
      publication_date: "04-04-2021"
    },
    {
      user: "Doradito",
      comment: "@Lokito_Ken? no serás tu?",
      publication_date: "04-04-2021"
    },
    {
      user: "Pepe",
      comment: "@Ivan????",
      publication_date: "04-04-2021"
    },
    {
      user: "Anónimo",
      comment: "Seguro que es @felipe_gonsales__, o quizás @Camaron...",
      publication_date: "04-04-2021"
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
          let match = word.match(keys.ctrl_instagram_pattern);
          let lastCharacters = word.replace(match![0], "").replace("@", "");
          finalString += `<a href="https://instagram.com/${match![0]}/" class="red-link">@${match![0]}</a>${lastCharacters} `
        } else {
          finalString += word + " ";
        }
      });
      comment.comment = finalString.trim();
    });
  }
}
