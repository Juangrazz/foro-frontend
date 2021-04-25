import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DatabaseService } from '../../../../services/database.service';
import { ControlService } from '../../../../services/control.service';
import { CardService } from '../../../../services/card.service';

import { NormalSearchModel } from '../../../../models/normal_search.model';
import { CardModel } from '../../../../models/card.model';

import keys from '../../../../../global/keys';
import { StorageService } from '../../../../services/storage.service';
declare var $: any;

@Component({
  selector: 'app-normal-search',
  templateUrl: './normal-search.component.html',
  styleUrls: ['./normal-search.component.scss']
})
export class NormalSearchComponent implements OnInit {

  normalSearchForm!: FormGroup;
  searchInfo: NormalSearchModel = new NormalSearchModel();

  dateError: boolean = false;
  placeError: boolean = false;
  formError: boolean = false;

  cards: CardModel[];
  noResults: boolean = false;

  keys = keys;

  constructor(private formBuilder: FormBuilder, private databaseService: DatabaseService, private controlService: ControlService, private cardService: CardService, private storageService: StorageService) {
    this.storageService.deleteSessionValue(keys.session_storage_individual_card);
    this.cards = this.cardService.normalSearch;
    this.createFrom();
  }

  ngOnInit(): void {
  }

  createFrom() {
    this.normalSearchForm = this.formBuilder.group({
      date: ['', [this.controlService.validateDate()]],
      place: ['', [Validators.minLength(keys.ctrl_place_min_length), Validators.maxLength(keys.ctrl_place_max_length)]],
    });
  }

  validateForm() {
    this.resetErrors();

    if (
      this.normalSearchForm.controls.date.value === "" &&
      this.normalSearchForm.controls.place.value === ""
    ) {
      this.formError = true;
    } else {
      if (this.normalSearchForm.valid) {
        this.searchInfo.date = this.normalSearchForm.controls.date.value;
        this.searchInfo.place = this.normalSearchForm.controls.place.value;

        this.normalSearch();

      } else {
        if (this.normalSearchForm.controls.date.invalid) this.dateError = true;
        if (this.normalSearchForm.controls.place.invalid) this.placeError = true;
      }
    }
  }

  resetErrors() {
    this.formError = false;
    this.placeError = false;
    this.dateError = false;
  }

  saveCard(card: CardModel) {
    this.storageService.setEncryptSessionValue(keys.session_storage_individual_card, card);
    this.cardService.individualCard = card;
  };

  saveResults() {
    this.cardService.normalSearch = this.cards;
  }

  checkResults() {
    this.noResults = false;
    if (this.cards.length === 0) {
      this.noResults = true;
    }
  }

  normalSearch() {
    if (this.searchInfo.place.toLowerCase() === keys.secret_search_1) {
      window.open(`https://www.google.com/maps/place/52%C2%B028'46.5%22N+62%C2%B011'07.0%22E/@52.4798328,62.1844731,527m/data=!3m1!1e3!4m5!3m4!1s0x0:0x0!8m2!3d52.479585!4d62.1852778`, '_blank');
    } else if (this.searchInfo.place.toLowerCase() === keys.secret_search_2) {
      window.open(`https://www.google.com/maps/place/Oimiak%C3%B3n,+Rep%C3%BAblica+de+Saj%C3%A1,+Rusia,+678750/@63.4604701,142.7431275,12.96z/data=!4m5!3m4!1s0x5be08e0e83cf8adb:0xf621cd31f6c885c0!8m2!3d63.464138!4d142.773727`, '_blank');
    }else if(this.searchInfo.place.toLowerCase() === keys.secret_search_3){
      window.open(`https://i.pinimg.com/originals/1e/29/90/1e29909b9659cb58569888ba846bf7f2.jpg`, '_blank');
    } else {
      this.databaseService.normalSearch(this.searchInfo).subscribe(
        (resp) => {
          this.cards = resp;

          this.checkResults();
          this.saveResults();
        },
        (error) => {
          $("#errorModalMessage").text(keys.error_modal_message);
          $('#errorModal').modal('show');
        }
      );
    }

    this.normalSearchForm.reset({ date: "", place: "" });
  }


}
