import { Component, OnInit } from '@angular/core';
import { CardModel } from 'src/app/models/card.model';
import { CardService } from '../../../services/card.service';
import { CommentsService } from '../../../services/comments.service';
import { CommentModel } from '../../../models/comment.model';
import keys from '../../../../keys';

declare var $: any;

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.css']
})
export class CardViewComponent implements OnInit {

  keys = keys;

  card: CardModel = new CardModel();
  comments: CommentModel[] =  [];

  constructor(private cardService: CardService, private commentsService: CommentsService) { 
    this.card = this.cardService.individualCard;

    this.commentsService.commentsFormatter();
    this.comments = this.commentsService.comments;
    
    
  }

  ngOnInit(): void {
    $("#info-container").css({"border-bottom-right-radius":"0", "border-bottom-left-radius":"0"});
    $("#card-container").removeClass("p-2").addClass("pl-2").addClass("pr-2").addClass("pt-2");
    $("#card-global-container").removeClass("mb-5");
  }

}
