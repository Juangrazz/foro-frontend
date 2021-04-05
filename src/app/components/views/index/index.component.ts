import { Component, OnInit } from '@angular/core';
import { CardModel } from 'src/app/models/card.model';
import { CardService } from '../../../services/card.service';
import { ControlService } from '../../../services/control.service';
import { DatabaseService } from '../../../services/database.service';

import * as moment from 'moment';
import keys from '../../../../keys';

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

  page: number = 1;
  dateToShow: string = moment().format("DD-MM-YYYY");
  dateNext!: string;
  dateBack!: string;

  constructor(private cardService: CardService, private controlService: ControlService, private databseService: DatabaseService) {
    this.getCards();
    this.controlService.showNavAndFoot.next(true);
    this.controlService.isAdmin.next(false);
    this.calculateDay();
  }

  ngOnInit(): void {
  }

  getCards() {
    
    this.databseService.getCards(this.dateToShow).subscribe(
      resp => {
        this.cards = resp;
    
        for (const card of this.cards) {
          card.date = moment(card.date).format("DD-MM-YYYY");
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

  calculateDay(){
    this.dateBack = moment(this.dateToShow, "DD-MM-YYYY").subtract(1, "days").format("DD");
    this.dateNext = moment(this.dateToShow, "DD-MM-YYYY").add(1, "days").format("DD");
  }

  addDay(){
    this.dateToShow = moment(this.dateToShow, "DD-MM-YYYY").add(1, "days").format("DD-MM-YYYY");
    this.calculateDay();
    this.getCards();
  }

  subtractDay(){
    this.dateToShow = moment(this.dateToShow, "DD-MM-YYYY").subtract(1, "days").format("DD-MM-YYYY");
    this.calculateDay();
    this.getCards();
  }

}
