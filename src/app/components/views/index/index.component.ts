import { Component, OnInit } from '@angular/core';
import { CardModel } from 'src/app/models/card.model';
import { CardService } from '../../../services/card.service';
import { ControlService } from '../../../services/control.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  noPosts: boolean = true;
  cards: CardModel[] = [];
  showNavAndFoot: boolean = true;

  constructor(private cardService: CardService, private controlService: ControlService) {
    this.getCards();
    this.checkCards();
    this.cardService.disabledCommentsLink = false;
    this.controlService.showNavAndFoot.next(true);
    this.controlService.isAdmin.next(false);
  }

  ngOnInit(): void {
  }

  getCards() {
    this.cards = this.cardService.cards;
  }

  checkCards() {
    if (this.cards.length === 0) {
      this.noPosts = true;
    } else {
      this.noPosts = false;
    }
  }

}
