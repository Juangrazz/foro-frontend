import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

import keys from '../../../../keys';
import { MymyvCardModel } from '../../../models/mymyv_card.model';
import { DatabaseService } from '../../../services/database.service';
import { CardService } from '../../../services/card.service';

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
      age: ['', [Validators.required, this.cardService.validateDate()]],
      kind: ['', Validators.required],
      lookFor: ['', [Validators.required, Validators.minLength(keys.ctrl_place_min_length), Validators.minLength(keys.ctrl_place_min_length)]],
      instagram: ['', Validators.pattern(new RegExp(keys.ctrl_instagram_pattern))],
      description: ['', [Validators.required, Validators.minLength(keys.ctrl_description_min_length), Validators.maxLength(keys.ctrl_place_max_length)]]
    });
  }

  
  resetErrors() {
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
