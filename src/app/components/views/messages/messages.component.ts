import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { CardModel } from 'src/app/models/card.model';
import { DatabaseService } from '../../../services/database.service';

import keys from "../../../../keys";

declare var $: any;
import * as moment from 'moment';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  keys = keys;

  cardForm!: FormGroup;
  card: CardModel = new CardModel();
  characters: number = 0;

  dateError: boolean = false;
  timeError: boolean = false;
  placeError: boolean = false;
  descriptionError: boolean = false;
  formError: boolean = false;

  constructor(private formBuilder: FormBuilder, private databaseService: DatabaseService) {
    this.createFrom();
  }

  ngOnInit(): void {

  }

  createFrom() {
    this.cardForm = this.formBuilder.group({
      date: ['', [Validators.required, this.validateDate()]],
      time: ['', Validators.required],
      place: ['', [Validators.required, Validators.minLength(2)]],
      instagram: ['', Validators.minLength(2)],
      description: ['', [Validators.required, Validators.minLength(50)]]
    })
  }

  validateFrom() {
    this.resetErrors();
    debugger;
    if (this.cardForm.valid) {
      this.card.date = this.cardForm.controls.date.value;
      this.card.time = this.cardForm.controls.time.value;
      this.card.place = this.cardForm.controls.place.value;
      this.card.instagram = this.cardForm.controls.instagram.value;
      this.card.description = this.cardForm.controls.description.value;

      if (this.card.instagram === "") {
        this.card.instagram = "Anónimo";
      }

      /*
      this.databaseService.createCard(this.card).subscribe(
        (resp) => {
          console.log(resp);
          this.cardForm.reset();
        },
        (error) => {
          $("#errorModalMessage").text(keys.error_modal_message);
          $('#errorModal').modal('show');
          console.error("An error has ocurred creating the card");
        }
      );
      */

    } else {
      if (this.cardForm.controls.description.invalid) this.descriptionError = true;
      if (this.cardForm.controls.place.invalid) this.placeError = true;
      if (this.cardForm.controls.date.invalid) this.dateError = true;
      if (this.cardForm.controls.time.invalid) this.timeError = true;
      if (
        this.cardForm.controls.description.value === "" &&
        this.cardForm.controls.place.value === "" &&
        this.cardForm.controls.date.value === "" &&
        this.cardForm.controls.time.value === ""
      ) {
        this.formError = true;
        this.descriptionError = false;
        this.placeError = false;
        this.dateError = false;
        this.timeError = false;
      }
    }
  }

  resetErrors() {
    this.formError = false;
    this.descriptionError = false;
    this.placeError = false;
    this.dateError = false;
    this.timeError = false;
  }

  countCharacters() {
    this.characters = this.cardForm.controls.description.value.length;
  }

  validateDate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }
      
      let date = moment(control.value);
      let now = moment().format("YYYY-MM-DD");
      let diff = date.diff(now, 'days');
      let valid = false;

      if (diff > 0) valid = true;

      return valid ? { dateValid: true } : null;
    }
  }
}
