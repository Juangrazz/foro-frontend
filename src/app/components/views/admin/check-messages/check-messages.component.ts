import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CardAcceptRejectModel } from 'src/app/models/card-accept-reject.model';

import { CardService } from '../../../../services/card.service';
import { ControlService } from '../../../../services/control.service';
import { DatabaseService } from '../../../../services/database.service';
import { StorageService } from 'src/app/services/storage.service';

import keys from '../../../../../global/keys';

import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-check-messages',
  templateUrl: './check-messages.component.html',
  styleUrls: ['./check-messages.component.scss']
})
export class CheckMessagesComponent implements OnInit {

  card: any = {};
  infoToSend: CardAcceptRejectModel = new CardAcceptRejectModel();
  characters: number = 0;
  effectController: boolean = false;

  keys = keys;

  constructor(private controlService: ControlService, private dataBaseService: DatabaseService, private cardService: CardService, private router: Router, private route: ActivatedRoute, private storageService: StorageService) {
    this.controlService.isAdmin.next(true);
    this.getOlderCard();
  }

  ngOnInit(): void {
  }

  async getOlderCard() {
    
    this.effectController = false;
    await this.dataBaseService.getOlderCard()
      .then(res => {
        this.effectController = true;
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
      this.infoToSend.current_date = moment().format("YYYY-MM-DD HH:mm:ss.SSS");

      this.dataBaseService.acceptCard(this.infoToSend).subscribe(
        resp => {
          this.getOlderCard();
        },
        err => {
          $("#errorModalMessage").html(keys.error_modal_message);
          $('#errorModal').modal('show');
        }
      );
    } else {
      this.infoToSend.card_id = this.card.id;
      this.infoToSend.current_date = moment().format("YYYY-MM-DD HH:mm:ss.SSS");

      this.dataBaseService.acceptMymyvCard(this.infoToSend).subscribe(
        resp => {
          this.getOlderCard();
        },
        err => {
          $("#errorModalMessage").html(keys.error_modal_message);
          $('#errorModal').modal('show');
        }
      );;
    }
  }

  reject() {
    if (this.card.model_type === keys.ctrl_model_card_normal_type) {
      this.infoToSend.card_id = this.card.id;
      this.infoToSend.current_date = moment().format("YYYY-MM-DD HH:mm:ss");

      this.dataBaseService.rejectCard(this.infoToSend).subscribe(
        resp => {
          this.getOlderCard();
        },
        err => {
          $("#errorModalMessage").html(keys.error_modal_message);
          $('#errorModal').modal('show');
        }
      );
    } else {
      this.infoToSend.card_id = this.card.id;
      this.infoToSend.current_date = moment().format("YYYY-MM-DD HH:mm:ss");

      this.dataBaseService.rejectMymyvCard(this.infoToSend).subscribe(
        resp => {
          this.getOlderCard();
        },
        err => {
          $("#errorModalMessage").html(keys.error_modal_message);
          $('#errorModal').modal('show');
        }
      );;
    }
  }

  modify() {
    this.cardService.newPlace = "";
    $("#newPlace").val("");
    $('#oldPlace').val(this.card.place);
    $('#modifyCard').modal('show');
    $("#modifyCard").on("hidden.bs.modal", () => {
      this.changePlace();
    });
  }

  changePlace() {
    let newPlace = this.cardService.newPlace;

    if (newPlace !== this.card.place && newPlace !== "") {
      this.card.place = newPlace;
      this.updateCardPlace();
    }
  }

  updateCardPlace() {
    this.dataBaseService.updateCardPlace(this.card).subscribe(
      resp => {
        $("#correctModalMessage").text(keys.correct_modal_place_updated);
        $('#correctModal').modal('show');
      },
      err => {
        $("#errorModalMessage").html(keys.error_modal_message);
        $('#errorModal').modal('show');
      }
    );
  }
}
