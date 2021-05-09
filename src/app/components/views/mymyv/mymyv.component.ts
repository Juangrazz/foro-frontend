import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MymyvCardModel } from '../../../models/mymyv_card.model';

import { DatabaseService } from '../../../services/database.service';
import { ControlService } from '../../../services/control.service';

import keys from '../../../../global/keys';
import { StorageService } from '../../../services/storage.service';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-mymyv',
  templateUrl: './mymyv.component.html',
  styleUrls: ['./mymyv.component.scss']
})
export class MymyvComponent implements OnInit {

  keys = keys;

  mymyvCardForm!: FormGroup;
  mymyvCard: MymyvCardModel = new MymyvCardModel();
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
    this.mymyvCardForm = this.formBuilder.group({
      age: [keys.ctrl_min_age, [Validators.required, Validators.min(keys.ctrl_min_age), Validators.max(keys.ctrl_max_age)]],
      kind: ['', Validators.required],
      lookFor: ['', Validators.required],
      instagram: ['', Validators.pattern(new RegExp(keys.ctrl_instagram_pattern))],
      description: ['', [Validators.required, Validators.minLength(keys.ctrl_description_min_length), Validators.maxLength(keys.ctrl_description_max_length)]]
    });
  }

  validateForm(){
    this.resetErrors();
    if (this.mymyvCardForm.valid) {
      this.mymyvCard.age = this.mymyvCardForm.controls.age.value;
      this.mymyvCard.kind = this.mymyvCardForm.controls.kind.value;
      this.mymyvCard.look_for = this.mymyvCardForm.controls.lookFor.value;
      this.mymyvCard.instagram = this.mymyvCardForm.controls.instagram.value;
      this.mymyvCard.description = this.mymyvCardForm.controls.description.value;
      this.mymyvCard.sending_date = moment().format("YYYY-MM-DD HH:mm:ss.SSS");
      this.mymyvCard.publicated = 0;

      if (this.mymyvCard.instagram === "" || this.mymyvCard.instagram === null) {
        this.mymyvCard.instagram = "Anónimo";
      }
      
      this.createMymyvCard();
      
    } else {
      if (this.mymyvCardForm.controls.description.invalid) this.descriptionError = true;
      if (this.mymyvCardForm.controls.age.invalid) this.ageError = true;
      if (this.mymyvCardForm.controls.kind.invalid) this.kindError = true;
      if (this.mymyvCardForm.controls.lookFor.invalid) this.lookForError = true;
      if (this.mymyvCardForm.controls.instagram.invalid) this.instaError = true;
      if (
        this.mymyvCardForm.controls.description.value === "" &&
        this.mymyvCardForm.controls.age.value === "" &&
        this.mymyvCardForm.controls.kind.value === "" &&
        this.mymyvCardForm.controls.lookFor.value === ""
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
    this.characters = this.controlService.countCharacters(this.mymyvCardForm.controls.description);
  }

  createMymyvCard(){
    this.databaseService.createMymyvCard(this.mymyvCard).subscribe(
      (resp) => {      
        if(resp.status === keys.ctrl_fail_result){
          $("#errorModalMessage").text(keys.error_modal_message);
          $('#errorModal').modal('show');
        } else if(resp.status === keys.ctrl_successful_result) {
          $("#correctModalMessage").text(keys.correct_modal_message);
          $('#correctModal').modal('show');
          $('#correctModal').on('hidden.bs.modal', () => {
            this.mymyvCardForm.reset();
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
