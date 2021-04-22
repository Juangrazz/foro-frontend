import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import { DatabaseService } from '../../../../services/database.service';

import keys from '../../../../../global/keys';
import { ControlService } from '../../../../services/control.service';
import { NormalSearchModel } from '../../../../models/normal_search.model';
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

  keys = keys;
  
  constructor(private formBuilder: FormBuilder, private databaseService: DatabaseService, private controlService: ControlService) { 
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

    if (this.normalSearchForm.valid) {
      this.searchInfo.date = this.normalSearchForm.controls.date.value;
      this.searchInfo.place = this.normalSearchForm.controls.place.value;

      this.databaseService.normalSearch(this.searchInfo).subscribe(
        (resp) => {
          console.log(resp);
          this.normalSearchForm.reset();
        },
        (error) => {
          $("#errorModalMessage").text(keys.error_modal_message);
          $('#errorModal').modal('show');
        }
      );
    } else {
      if (this.normalSearchForm.controls.date.invalid) this.dateError = true;
      if (this.normalSearchForm.controls.place.invalid) this.placeError = true;
      if (
        this.normalSearchForm.controls.date.value === "" &&
        this.normalSearchForm.controls.place.value === ""
      ) {
        this.formError = true;
        this.placeError = false;
        this.dateError = false;
      }
    }
  }

  resetErrors() {
    this.formError = false;
    this.placeError = false;
    this.dateError = false;
  }

}
