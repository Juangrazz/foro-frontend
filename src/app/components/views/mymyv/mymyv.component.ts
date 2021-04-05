import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

import keys from '../../../../keys';
import { DatabaseService } from '../../../services/database.service';
import { CardService } from '../../../services/card.service';
import { MymyvCardModel } from '../../../models/mymyv_card.model';

@Component({
  selector: 'app-mymyv',
  templateUrl: './mymyv.component.html',
  styleUrls: ['./mymyv.component.css']
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
  
  constructor(private formBuilder: FormBuilder, private databaseService: DatabaseService, private cardService: CardService) { 
    this.createFrom();
  }

  ngOnInit(): void {
  }

  createFrom() {
    this.mymyvCardForm = this.formBuilder.group({
      age: ['18', [Validators.required, Validators.min(18), Validators.max(100)]],
      kind: ['', Validators.required],
      lookFor: ['', [Validators.required, Validators.minLength(keys.ctrl_place_min_length), Validators.minLength(keys.ctrl_place_min_length)]],
      instagram: ['', Validators.pattern(new RegExp(keys.ctrl_instagram_pattern))],
      description: ['', [Validators.required, Validators.minLength(keys.ctrl_description_min_length), Validators.maxLength(keys.ctrl_description_max_length)]]
    });
  }

  validateForm(){
    console.log(this.mymyvCardForm);
    
    this.resetErrors();

    if (this.mymyvCardForm.valid) {
      this.mymyvCard.age = this.mymyvCardForm.controls.age.value;
      this.mymyvCard.kind = this.mymyvCardForm.controls.kind.value;
      this.mymyvCard.lookFor = this.mymyvCardForm.controls.lookFor.value;
      this.mymyvCard.instagram = this.mymyvCardForm.controls.instagram.value;
      this.mymyvCard.description = this.mymyvCardForm.controls.description.value;

      if (this.mymyvCard.instagram === "" || this.mymyvCard.instagram === null) {
        this.mymyvCard.instagram = "Anónimo";
      }

      /*
      this.databaseService.createCard(this.mymyvCard).subscribe(
        (resp) => {
          if(resp.status === "KO"){
            $("#errorModalMessage").text(keys.error_modal_message);
            $('#errorModal').modal('show');
          } else if(resp.status === "OK") {
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
      */
      

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
    this.characters = this.cardService.countCharacters(this.mymyvCardForm.controls.description);
  }

}
