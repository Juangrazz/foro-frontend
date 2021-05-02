import { Component, OnInit } from '@angular/core';
import { ControlService } from '../../../../services/control.service';
import { CardModel } from '../../../../models/card.model';
import keys from '../../../../../global/keys';
import { DatabaseService } from '../../../../services/database.service';

import * as moment from 'moment';
import { CardAcceptRejectModel } from 'src/app/models/card-accept-reject.model';

@Component({
  selector: 'app-check-messages',
  templateUrl: './check-messages.component.html',
  styleUrls: ['./check-messages.component.scss']
})
export class CheckMessagesComponent implements OnInit {

  card: any = {};
  infoToSend: CardAcceptRejectModel = new CardAcceptRejectModel();

  keys = keys;

  constructor(private controlService: ControlService, private dataBaseService: DatabaseService) {
    this.controlService.isAdmin.next(true);
    this.getOlderCard();
  }

  ngOnInit(): void {
  }

  async getOlderCard() {
    this.card = {};
    await this.dataBaseService.getOlderCard()
      .then(res => {
        this.card = res[0][0];
        
        if (this.card !== undefined) {
          this.cardModification();
        }
      })
      .catch(err => {
      }
      );
  }

  cardModification() {
    if (typeof (this.card.place) !== "undefined") {
      this.card.model_type = keys.ctrl_model_card_normal_type;
    } else {
      this.card.model_type = keys.ctrl_model_card_mymyv_type;
    }

    this.card.publication_date = moment(this.card.publication_date, "DD-MM-YYYY").format("DD-MM-YYYY");

    if (this.card.model_type === keys.ctrl_model_card_normal_type) {
      this.card.date = moment(this.card.date, "DD-MM-YYYY").format("DD-MM-YYYY");
    }
  }

  accept() {
    if (this.card.model_type === keys.ctrl_model_card_normal_type) {
      this.infoToSend.card_id = this.card.id;
      this.infoToSend.current_date = moment().format("YYYY-MM-DD HH:mm:ss");

      this.dataBaseService.acceptCard(this.infoToSend).subscribe(
        resp => {
          this.getOlderCard();
        },
        err => {

        }
      );
    } else {
      this.infoToSend.card_id = this.card.id;
      this.infoToSend.current_date = moment().format("YYYY-MM-DD HH:mm:ss");

      this.dataBaseService.acceptMymyvCard(this.infoToSend).subscribe(
        resp => {
          this.getOlderCard();
        },
        err => {

        }
      );;
    }
  }

}
