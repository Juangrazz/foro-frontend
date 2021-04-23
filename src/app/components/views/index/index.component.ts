import { Component, OnInit } from '@angular/core';
import { CardService } from '../../../services/card.service';
import { ControlService } from '../../../services/control.service';
import { DatabaseService } from '../../../services/database.service';

import { MymyvCardModel } from '../../../models/mymyv_card.model';
import { CardModel } from 'src/app/models/card.model';

import * as moment from 'moment';
import keys from '../../../../global/keys';

declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  keys = keys;

  noPosts: boolean = false;
  cards: CardModel[] = [];
  mymyvCards: MymyvCardModel[] = [];
  allCards: any[] = [];
  showNavAndFoot: boolean = true;

  page: number = 1;
  dateToShow: string;
  dateNext!: string;
  dateBack!: string;

  constructor(private cardService: CardService, private controlService: ControlService, private databseService: DatabaseService) {
    sessionStorage.removeItem("individual_card");
    
    this.dateToShow = this.cardService.dateToShow;

    this.getAllCards();
    this.controlService.showNavAndFoot.next(true);
    this.controlService.isAdmin.next(false);
    this.calculateDay();
  }

  ngOnInit(): void {
  }

  async getAllCards() {
    this.allCards = [];

    await this.databseService.getCards(this.dateToShow)
      .then(res => {
          const cards = res;
          for (const card of cards) {
            this.allCards.push(card);
          }
        })
      .catch(err => {
          $("#errorModalMessage").html(keys.error_modal_message_2);
          $('#errorModal').modal('show');
        }
      );
    await this.databseService.getMymyvCards(this.dateToShow)
    .then(res => {
        const mymyvCards = res;
        for (const card of mymyvCards) {
          this.allCards.push(card);
        }
      })
      .catch(err => {
          $("#errorModalMessage").html(keys.error_modal_message_2);
          $('#errorModal').modal('show');
        }
      );

      this.checkCards();

    this.allCards.sort((a, b) => new Date(b.publication_date).getTime() - new Date(a.publication_date).getTime());
  }


  checkCards() {
    if (this.allCards.length === 0) {
      this.noPosts = true;
    } else {
      this.noPosts = false;
    }
  }

  saveCard(card: CardModel) {
    sessionStorage.setItem("individual_card", JSON.stringify(card));
    this.cardService.individualCard = card;
  };

  calculateDay() {
    this.dateBack = moment(this.dateToShow, "DD-MM-YYYY").subtract(1, "days").format("DD");
    this.dateNext = moment(this.dateToShow, "DD-MM-YYYY").add(1, "days").format("DD");
  }

  addDay() {
    this.dateToShow = moment(this.dateToShow, "DD-MM-YYYY").add(1, "days").format("DD-MM-YYYY");
    this.calculateDay();
    this.getAllCards();

    this.saveDateToShow();
  }

  subtractDay() {
    this.dateToShow = moment(this.dateToShow, "DD-MM-YYYY").subtract(1, "days").format("DD-MM-YYYY");
    this.calculateDay();
    this.getAllCards();

    this.saveDateToShow();
  }

  saveDateToShow() {
    sessionStorage.setItem("date_to_show", JSON.stringify(this.dateToShow));
    this.cardService.dateToShow = this.dateToShow;
  }

  reloadToCurrentDay(){
    this.dateToShow = moment().format("DD-MM-YYYY");
    
    this.calculateDay();
    this.getAllCards();
    this.saveDateToShow();
  }

}
