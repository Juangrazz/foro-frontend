import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { PeopleCardModel } from '../../../models/people_card.model';

import { DatabaseService } from '../../../services/database.service';
import { ControlService } from '../../../services/control.service';
import { StorageService } from '../../../services/storage.service';

import keys from '../../../../global/keys';

import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  keys = keys;

  peopleCardForm!: FormGroup;
  peopleCard: PeopleCardModel = new PeopleCardModel();
  characters: number = 0;

  ageError: boolean = false;
  kindError: boolean = false;
  lookForError: boolean = false;
  instaError: boolean = false;
  descriptionError: boolean = false;
  formError: boolean = false;
  
  constructor(private formBuilder: FormBuilder, private databaseService: DatabaseService, private controlService: ControlService, private storageService: StorageService) { 
    this.createFrom();
  }

  ngOnInit(): void {
  }

  createFrom() {
    this.peopleCardForm = this.formBuilder.group({
      age: [keys.ctrl_min_age, [Validators.required, Validators.min(keys.ctrl_min_age), Validators.max(keys.ctrl_max_age)]],
      kind: ['', Validators.required],
      lookFor: ['', Validators.required],
      instagram: ['', Validators.pattern(new RegExp(keys.ctrl_instagram_pattern))],
      description: ['', [Validators.required, Validators.minLength(keys.ctrl_description_min_length), Validators.maxLength(keys.ctrl_description_max_length)]]
    });
  }

  validateForm(){
    this.resetErrors();
    if (this.peopleCardForm.valid) {
      this.peopleCard.age = this.peopleCardForm.controls.age.value;
      this.peopleCard.kind = this.peopleCardForm.controls.kind.value;
      this.peopleCard.look_for = this.peopleCardForm.controls.lookFor.value;
      this.peopleCard.instagram = this.peopleCardForm.controls.instagram.value;
      this.peopleCard.description = this.peopleCardForm.controls.description.value;
      this.peopleCard.sending_date = moment().format("YYYY-MM-DD HH:mm:ss.SSS");
      this.peopleCard.publicated = 0;

      if (this.peopleCard.instagram === "" || this.peopleCard.instagram === null) {
        this.peopleCard.instagram = "Anónimo";
      }
      
      this.createPeopleCard();
      
    } else {
      if (this.peopleCardForm.controls.description.invalid) this.descriptionError = true;
      if (this.peopleCardForm.controls.age.invalid) this.ageError = true;
      if (this.peopleCardForm.controls.kind.invalid) this.kindError = true;
      if (this.peopleCardForm.controls.lookFor.invalid) this.lookForError = true;
      if (this.peopleCardForm.controls.instagram.invalid) this.instaError = true;
      if (
        this.peopleCardForm.controls.description.value === "" &&
        this.peopleCardForm.controls.age.value === "" &&
        this.peopleCardForm.controls.kind.value === "" &&
        this.peopleCardForm.controls.lookFor.value === ""
      ) {
        this.formError = true;
        this.descriptionError = false;
        this.ageError = false;
        this.kindError = false;
        this.lookForError = false;
        this.instaError = false;
      }
    }
  }

  
  resetErrors() {
    this.formError = false;
    this.ageError = false;
    this.kindError = false;
    this.lookForError = false;
    this.instaError = false;
    this.descriptionError = false;
  }

  countCharacters() {
    this.characters = this.controlService.countCharacters(this.peopleCardForm.controls.description);
  }

  createPeopleCard(){
    this.databaseService.createPeopleCard(this.peopleCard).subscribe(
      (resp) => {      
        if(resp.status === keys.ctrl_fail_result){
          $("#errorModalMessage").text(keys.error_modal_message);
          $('#errorModal').modal('show');
        } else if(resp.status === keys.ctrl_successful_result) {
          $("#correctModalMessage").text(keys.correct_modal_message);
          $('#correctModal').modal('show');
          $('#correctModal').on('hidden.bs.modal', () => {
            this.peopleCardForm.reset();
          });
        }
      },
      (error) => {
        $("#errorModalMessage").text(keys.error_modal_message);
        $('#errorModal').modal('show');
      }
    );
  }

}
