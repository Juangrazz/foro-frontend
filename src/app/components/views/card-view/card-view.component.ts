import { Component, OnInit } from '@angular/core';
import { CardModel } from 'src/app/models/card.model';
import { CardService } from '../../../services/card.service';
import { CommentsService } from '../../../services/comments.service';
import { CommentModel } from '../../../models/comment.model';
import keys from '../../../../keys';
import { DatabaseService } from '../../../services/database.service';
import { MymyvCardModel } from '../../../models/mymyv_card.model';

declare var $: any;

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.css']
})
export class CardViewComponent implements OnInit {

  keys = keys;

  card: any = {};
  comments: CommentModel[] = [];
  noComments: boolean = false;

  constructor(private cardService: CardService, private commentsService: CommentsService, private databaseService: DatabaseService) {
    this.card = this.cardService.individualCard;
    this.getComments();
  }

  ngOnInit(): void {
    $("#info-container").css({ "border-bottom-right-radius": "0", "border-bottom-left-radius": "0" });
    $("#card-container").removeClass("p-2").addClass("pl-2").addClass("pr-2").addClass("pt-2");
    $("#card-global-container").removeClass("mb-5");
  }

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

  async getComments() {
    if (this.card.model_type === keys.ctrl_model_card_normal_type) {
      await this.databaseService.getCardComments(this.card.id)
        .then(res => {
          this.comments = res;
          this.comments = this.commentsService.commentsFormatter(this.comments);
          this.checkComments();
        })
        .catch(err => {
          $("#errorModalMessage").html(keys.error_modal_message_2);
          $('#errorModal').modal('show');
        });
    } else {
      await this.databaseService.getMymyvCardComments(this.card.id)
      .then(res => {
        this.comments = res;
        this.comments = this.commentsService.commentsFormatter(this.comments);
        this.checkComments();
      })        
      .catch(err => {
        $("#errorModalMessage").html(keys.error_modal_message_2);
        $('#errorModal').modal('show');
      });;
      this.comments = this.commentsService.commentsFormatter(this.comments);
    }

    this.checkComments();
  }

  checkComments() {
    if (this.comments.length === 0) {
      this.noComments = true;
    } else {
      this.noComments = false;
    }
  }

}
