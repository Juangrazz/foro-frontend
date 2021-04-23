import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DatabaseService } from '../../../../services/database.service';
import { ControlService } from '../../../../services/control.service';
import { CardService } from '../../../../services/card.service';

import { MymyvSearchModel } from '../../../../models/mymyv_search_model';
import { MymyvCardModel } from 'src/app/models/mymyv_card.model';

import keys from 'src/global/keys';
declare var $: any;

@Component({
  selector: 'app-mymyv-search',
  templateUrl: './mymyv-search.component.html',
  styleUrls: ['./mymyv-search.component.scss']
})
export class MymyvSearchComponent implements OnInit {

  mymyvSearchForm!: FormGroup;
  searchInfo: MymyvSearchModel = new MymyvSearchModel();

  minAgeError: boolean = false;
  maxAgeError: boolean = false;
  kindError: boolean = false;
  lookForError: boolean = false;
  formError: boolean = false;

  cards: MymyvCardModel[];
  noResults: boolean = false;

  keys = keys;
  
  constructor(private formBuilder: FormBuilder, private databaseService: DatabaseService, private controlService: ControlService, private cardService: CardService) { 
    sessionStorage.removeItem("individual_card");
    this.cards = this.cardService.mymyvSearch;
    this.createFrom();
  }

  ngOnInit(): void {
  }

  createFrom() {
    this.mymyvSearchForm = this.formBuilder.group({
      min_age:[, [Validators.min(keys.ctrl_min_age), Validators.max(keys.ctrl_max_age)]],
      max_age:[, [Validators.min(keys.ctrl_min_age), Validators.max(keys.ctrl_max_age)]],
      kind: [''],
      look_for: [''],
    });
  }

  validateForm() {
    this.resetErrors();
    if (
      this.mymyvSearchForm.controls.min_age.value === null &&
      this.mymyvSearchForm.controls.max_age.value === null &&
      this.mymyvSearchForm.controls.kind.value === "" &&
      this.mymyvSearchForm.controls.look_for.value === ""
    ) {
      this.formError = true;
    } else {
      if (this.mymyvSearchForm.valid) {
        this.searchInfo.min_age = this.mymyvSearchForm.controls.min_age.value;
        this.searchInfo.max_age = this.mymyvSearchForm.controls.max_age.value;
        this.searchInfo.kind = this.mymyvSearchForm.controls.kind.value;
        this.searchInfo.look_for = this.mymyvSearchForm.controls.look_for.value;
        
        this.databaseService.mymyvSearch(this.searchInfo).subscribe(
          (resp) => {
            this.cards = resp;
            
            this.checkResults();
            this.saveResults();
            this.mymyvSearchForm.reset({ kind: "", look_for: "" });
          },
          (error) => {
            $("#errorModalMessage").text(keys.error_modal_message);
            $('#errorModal').modal('show');
          }
        );
    
      } else {
        if (this.mymyvSearchForm.controls.min_age.invalid) this.minAgeError = true;
        if (this.mymyvSearchForm.controls.max_age.invalid) this.maxAgeError = true;
      }
    }
  }

  resetErrors() {
    this.formError = false;
    this.minAgeError = false;
    this.maxAgeError = false;
  }

  saveCard(card: MymyvCardModel) {
    sessionStorage.setItem("individual_card", JSON.stringify(card));
    this.cardService.individualCard = card;
  };

  saveResults(){
    sessionStorage.setItem("mymyv_search", JSON.stringify(this.cards));
    this.cardService.mymyvSearch = this.cards;
  }

  checkResults(){
    this.noResults = false;
    if(this.cards.length === 0){
      this.noResults = true;
    }
  }

}
