import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DatabaseService } from '../../../../services/database.service';
import { ControlService } from '../../../../services/control.service';
import { AdminModel } from '../../../../models/admin.model';

import keys from '../../../../../global/keys';

import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.scss']
})
export class CreateAdminComponent implements OnInit {

  keys = keys;

  createAdminForm!: FormGroup;
  admin: AdminModel = new AdminModel();

  nameError: boolean = false;
  lastnameError: boolean = false;
  emailError: boolean = false;
  passwordError: boolean = false;
  confPasswordError: boolean = false;
  formError: boolean = false;
  
  constructor(private formBuilder: FormBuilder, private controlService: ControlService, private dataService: DatabaseService) { 
    this.createFrom();
    this.controlService.isAdmin.next(true);
  }

  ngOnInit(): void {
  }

  createFrom() {
    this.createAdminForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(keys.ctrl_name_min_lenght)]],
      lastname: ['', [Validators.required, Validators.minLength(keys.ctrl_lastname_min_lenght)]],
      email: ['', [Validators.required, Validators.pattern(keys.ctrl_email_pattern)]],
      password: ['', [Validators.required, Validators.minLength(keys.ctrl_password_min_lenght)]],
      confPassword: ['', [Validators.required, Validators.minLength(keys.ctrl_password_min_lenght)]]
    });
  }

  validateForm() {
    
    this.resetErrors();
    let passValidation = this.checkPassword(this.createAdminForm.controls.password.value, this.createAdminForm.controls.confPassword.value);
    
    if (this.createAdminForm.controls.name.invalid) this.nameError = true;
    if (this.createAdminForm.controls.lastname.invalid) this.lastnameError = true;
    if (this.createAdminForm.controls.email.invalid) this.emailError = true;
    if (this.createAdminForm.controls.password.invalid) this.passwordError = true;
    if (!passValidation) this.confPasswordError = true;
    if (
      this.createAdminForm.controls.name.value === "" &&
      this.createAdminForm.controls.lastname.value === "" &&
      this.createAdminForm.controls.email.value === "" &&
      this.createAdminForm.controls.password.value === "" &&
      this.createAdminForm.controls.confPassword.value === ""
    ) {
      this.formError = true;
      this.nameError = false;
      this.lastnameError = false;
      this.emailError = false;
      this.passwordError = false;
      this.confPasswordError = false;
    }

    if (this.createAdminForm.valid && passValidation) {
      this.admin.name = this.createAdminForm.controls.name.value.toUpperCase();
      this.admin.lastname = this.createAdminForm.controls.lastname.value.toUpperCase();
      this.admin.email = this.createAdminForm.controls.email.value;
      this.admin.password = this.createAdminForm.controls.password.value;
      this.admin.creation_date = moment().format("YYYY-MM-DD HH:mm:ss");
      this.admin.last_update = moment().format("YYYY-MM-DD HH:mm:ss");

      this.createAdmin();
    }
  }

  resetErrors() {
    this.formError = false;
    this.nameError = false;
    this.lastnameError = false;
    this.emailError = false;
    this.passwordError = false;
    this.confPasswordError = false;
  }

  checkPassword(pass: string, confPass: string): boolean{
    if(pass === confPass){
      return true;
    } else {
      return false;
    }
  }

  createAdmin(){
    this.dataService.createAdmin(this.admin).subscribe(
      resp => {
        if(resp.status === keys.ctrl_fail_result){
          $("#errorModalMessage").text(keys.error_modal_message);
          $('#errorModal').modal('show');
        } else if(resp.status === keys.ctrl_successful_result) {
          $("#correctModalMessage").text(keys.correct_modal_create_admin);
          $('#correctModal').modal('show');
          $('#correctModal').on('hidden.bs.modal', () => {
            this.createAdminForm.reset({name: "", lastname: "", email: "", password: "", confPassword: ""});
          });
        }
      },
      err => {
        $("#errorModalMessage").text(keys.error_modal_message);
        $('#errorModal').modal('show');
      }
    );
  }


}
