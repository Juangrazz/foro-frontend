import { Component, OnInit } from '@angular/core';

import { PeopleCardModel } from '../../../models/people_card.model';
import { CardModel } from 'src/app/models/card.model';

import { CardService } from '../../../services/card.service';
import { ControlService } from '../../../services/control.service';
import { DatabaseService } from '../../../services/database.service';
import { StorageService } from '../../../services/storage.service';

import keys from '../../../../global/keys';

import * as moment from 'moment';
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
  peopleCards: PeopleCardModel[] = [];
  allCards: any[] = [];
  showNavAndFoot: boolean = true;

  page: number = 1;
  dateToShow: string;
  dateNext!: string;
  dateBack!: string;

  constructor(private cardService: CardService, private controlService: ControlService, private databaseService: DatabaseService, private storageService: StorageService) {
    this.storageService.deleteSessionValue(keys.session_storage_individual_card);
    
    this.dateToShow = this.cardService.dateToShow;

    this.getAllCards();
    this.controlService.showNavAndFoot.next(true);
    this.controlService.isAdmin.next(false);
    this.calculateDay();
  }

  ngOnInit(): void {
  }

  async getAllCards() {
    let databaseCards: any = [];

    await this.databaseService.getCards(this.dateToShow)
      .then(res => {
          const cards = res;
          
          for (const card of cards) {
            databaseCards.push(card);
          }
        })
      .catch(err => {
          $("#errorModalMessage").html(keys.error_modal_message_2);
          $('#errorModal').modal('show');
        }
      );
    await this.databaseService.getPeopleCards(this.dateToShow)
    .then(res => {
        const peopleCards = res;
        for (const card of peopleCards) {
          databaseCards.push(card);
        }
      })
      .catch(err => {
          $("#errorModalMessage").html(keys.error_modal_message_2);
          $('#errorModal').modal('show');
        }
      );

      databaseCards.sort((a: any, b: any) => new Date(b.publication_date).getTime() - new Date(a.publication_date).getTime());
      this.allCards = databaseCards;

      this.checkCards();
  }


  checkCards() {
    if (this.allCards.length === 0) {
      this.noPosts = true;
    } else {
      this.noPosts = false;
    }
  }

  saveCard(card: CardModel) {
    this.storageService.setEncryptSessionValue(keys.session_storage_individual_card, card);
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
    this.storageService.setSessionValue(keys.session_storage_date_to_show, JSON.stringify(this.dateToShow));
    this.cardService.dateToShow = this.dateToShow;
  }

  reloadToCurrentDay(){
    this.dateToShow = moment().format("DD-MM-YYYY");
    
    this.calculateDay();
    this.getAllCards();
    this.saveDateToShow();
  }

}
