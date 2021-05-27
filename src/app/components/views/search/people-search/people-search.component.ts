import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DatabaseService } from '../../../../services/database.service';
import { CardService } from '../../../../services/card.service';
import { StorageService } from '../../../../services/storage.service';

import { PeopleSearchModel } from '../../../../models/people_search_model';
import { PeopleCardModel } from 'src/app/models/people_card.model';

import keys from 'src/global/keys';

declare var $: any;

@Component({
  selector: 'app-people-search',
  templateUrl: './people-search.component.html',
  styleUrls: ['./people-search.component.scss']
})
export class PeopleSearchComponent implements OnInit {

  public config = {
      id: 'custom',
      itemsPerPage: 6,
      currentPage: 1,
  };

  peopleSearchForm!: FormGroup;
  searchInfo: PeopleSearchModel = new PeopleSearchModel();

  minAgeError: boolean = false;
  maxAgeError: boolean = false;
  kindError: boolean = false;
  lookForError: boolean = false;
  formError: boolean = false;

  cards: PeopleCardModel[];
  noResults: boolean = false;
  subPagination: boolean = false;

  keys = keys;

  
  constructor(private formBuilder: FormBuilder, private databaseService: DatabaseService, private cardService: CardService, private storageService: StorageService) { 
    this.storageService.deleteSessionValue(keys.session_storage_individual_card);
    this.cards = this.cardService.peopleSearch;
    this.createFrom();
  }

  ngOnInit(): void {
    this.onWindowResize();
  }

  createFrom() {
    this.peopleSearchForm = this.formBuilder.group({
      min_age:[, [Validators.min(keys.ctrl_min_age), Validators.max(keys.ctrl_max_age)]],
      max_age:[, [Validators.min(keys.ctrl_min_age), Validators.max(keys.ctrl_max_age)]],
      kind: [''],
      look_for: [''],
    });
  }

  validateForm() {
    this.resetErrors();
    if (
      this.peopleSearchForm.controls.min_age.value === null &&
      this.peopleSearchForm.controls.max_age.value === null &&
      this.peopleSearchForm.controls.kind.value === "" &&
      this.peopleSearchForm.controls.look_for.value === ""
    ) {
      this.formError = true;
    } else {
      if (this.peopleSearchForm.valid) {
        this.searchInfo.min_age = this.peopleSearchForm.controls.min_age.value;
        this.searchInfo.max_age = this.peopleSearchForm.controls.max_age.value;
        this.searchInfo.kind = this.peopleSearchForm.controls.kind.value;
        this.searchInfo.look_for = this.peopleSearchForm.controls.look_for.value;
        
        this.config.currentPage = 1;
        this.peopleSearch();
    
      } else {
        if (this.peopleSearchForm.controls.min_age.invalid) this.minAgeError = true;
        if (this.peopleSearchForm.controls.max_age.invalid) this.maxAgeError = true;
      }
    }
  }

  resetErrors() {
    this.formError = false;
    this.minAgeError = false;
    this.maxAgeError = false;
  }

  saveCard(card: PeopleCardModel) {
    this.storageService.setEncryptSessionValue(keys.session_storage_individual_card, card);
    this.cardService.individualCard = card;
  };

  saveResults(){
    this.cardService.peopleSearch = this.cards;
  }

  checkResults(){
    this.noResults = false;
    if(this.cards.length === 0){
      this.noResults = true;
    }
  }

  peopleSearch(){
    this.databaseService.peopleSearch(this.searchInfo).subscribe(
      (resp) => {
        this.cards = resp;
        
        this.checkResults();
        this.saveResults();
        this.peopleSearchForm.reset({ kind: "", look_for: "" });
      },
      (error) => {
        $("#errorModalMessage").text(keys.error_modal_message);
        $('#errorModal').modal('show');
      }
    );
  }

  onWindowResize(){

    if($(window).width() < 576){
      this.subPagination = true;
    } else {
      this.subPagination = false;
    }

    $( window ).resize(() => {
      if($(window).width() < 576){
        this.subPagination = true;
      } else {
        this.subPagination = false;
      }
    });
  }

}
