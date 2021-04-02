import { Component, OnInit } from '@angular/core';
import { CardModel } from 'src/app/models/card.model';
import { CardService } from '../../../services/card.service';
import { ControlService } from '../../../services/control.service';
import { DatabaseService } from '../../../services/database.service';

import keys from '../../../../keys';
import * as moment from 'moment';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  keys = keys;

  noPosts: boolean = true;
  cards: CardModel[] = [];
  showNavAndFoot: boolean = true;

  constructor(private cardService: CardService, private controlService: ControlService, private databseService: DatabaseService) {
    this.getCards();
    this.controlService.showNavAndFoot.next(true);
    this.controlService.isAdmin.next(false);
  }

  ngOnInit(): void {
  }

  getCards() {
    this.databseService.getCards().subscribe(
      resp => {
        this.cards = resp;
        for (const card of this.cards) {
          card.publication_date = card.publication_date?.split(" ")[0];
        }
        this.checkCards();
      },
      err => {

      }
    );
  }

  checkCards() {
    if (this.cards.length === 0) {
      this.noPosts = true;
    } else {
      this.noPosts = false;
    }
  }


  saveCard(card: CardModel) {
    sessionStorage.setItem("individual_card", JSON.stringify(card));
    this.cardService.individualCard = card;
  };

}
