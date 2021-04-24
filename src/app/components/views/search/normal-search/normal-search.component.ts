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
    sessionStorage.removeItem(keys.session_storage_individual_card);
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
  
        this.databaseService.normalSearch(this.searchInfo).subscribe(
          (resp) => {
            this.cards = resp;
            
            this.checkResults();
            this.saveResults();
            this.normalSearchForm.reset({date: "", place: ""});
          },
          (error) => {
            $("#errorModalMessage").text(keys.error_modal_message);
            $('#errorModal').modal('show');
          }
        );
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

  saveResults(){  
    this.cardService.normalSearch = this.cards;
  }

  checkResults(){
    this.noResults = false;
    if(this.cards.length === 0){
      this.noResults = true;
    }
  }

}
