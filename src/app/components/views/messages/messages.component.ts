import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CardModel } from 'src/app/models/card.model';
import { DatabaseService } from '../../../services/database.service';

import keys from "../../../../keys";
import { CardService } from '../../../services/card.service';

declare var $: any;

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
  instaError: boolean = false;

  constructor(private formBuilder: FormBuilder, private databaseService: DatabaseService, private cardService: CardService) {
    this.createFrom();
  }

  ngOnInit(): void {

  }

  createFrom() {
    this.cardForm = this.formBuilder.group({
      date: ['', [Validators.required, this.cardService.validateDate()]],
      time: ['', Validators.required],
      place: ['', [Validators.required, Validators.minLength(keys.ctrl_place_min_length), Validators.minLength(keys.ctrl_place_min_length)]],
      instagram: ['', Validators.pattern(new RegExp(keys.ctrl_instagram_pattern))],
      description: ['', [Validators.required, Validators.minLength(keys.ctrl_description_min_length), Validators.maxLength(keys.ctrl_description_max_length)]]
    });
  }

  validateForm() {
    this.resetErrors();

    if (this.cardForm.valid) {
      this.card.date = this.cardForm.controls.date.value;
      this.card.time = this.cardForm.controls.time.value;
      this.card.place = this.cardForm.controls.place.value;
      this.card.instagram = this.cardForm.controls.instagram.value;
      this.card.description = this.cardForm.controls.description.value;

      if (this.card.instagram === "" || this.card.instagram === null) {
        this.card.instagram = "Anónimo";
      }

      this.databaseService.createCard(this.card).subscribe(
        (resp) => {
          if(resp.status === "KO"){
            $("#errorModalMessage").text(keys.error_modal_message);
            $('#errorModal').modal('show');
          } else if(resp.status === "OK") {
            $("#correctModalMessage").text(keys.correct_modal_message);
            $('#correctModal').modal('show');
            $('#correctModal').on('hidden.bs.modal', () => {
              this.cardForm.reset();
            });
          }
          
        },
        (error) => {
          $("#errorModalMessage").text(keys.error_modal_message);
          $('#errorModal').modal('show');
        }
      );
      

    } else {
      if (this.cardForm.controls.description.invalid) this.descriptionError = true;
      if (this.cardForm.controls.place.invalid) this.placeError = true;
      if (this.cardForm.controls.date.invalid) this.dateError = true;
      if (this.cardForm.controls.time.invalid) this.timeError = true;
      if (this.cardForm.controls.instagram.invalid) this.instaError = true;
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
        this.instaError = false;
      }
    }
  }

  resetErrors() {
    this.formError = false;
    this.descriptionError = false;
    this.placeError = false;
    this.dateError = false;
    this.timeError = false;
    this.instaError = false;
  }

  countCharacters() {
    this.characters = this.cardService.countCharacters(this.cardForm.controls.description);
  }


}
