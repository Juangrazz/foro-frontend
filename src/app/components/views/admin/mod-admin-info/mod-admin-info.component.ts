import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AdminModel } from 'src/app/models/admin.model';
import { adminCredentialsModel } from '../../../../models/admin_credentials.model';

import { DatabaseService } from '../../../../services/database.service';
import { ControlService } from '../../../../services/control.service';

import keys from '../../../../../global/keys';

declare var $: any;

@Component({
  selector: 'app-mod-admin-info',
  templateUrl: './mod-admin-info.component.html',
  styleUrls: ['./mod-admin-info.component.scss']
})
export class ModAdminInfoComponent implements OnInit {

  keys = keys;
  admin: AdminModel = new AdminModel();

  formPersonalData!: FormGroup;
  nameError: boolean = false;
  lastnameError: boolean = false;
  emailError: boolean = false;
  formPersonalDataError: boolean = false;

  formPassword!: FormGroup;
  oldPasswordEmptyError: boolean = false;
  oldPasswordMatchError: boolean = false;
  newPasswordError: boolean = false;
  newPasswordConfError: boolean = false;
  formPasswordError: boolean = false;

  constructor(private controlService: ControlService, private formBuilder: FormBuilder, private databaseService: DatabaseService) { 
    this.controlService.isAdmin.next(true);
    this.databaseService.getAdminData().then(resp => {
      this.admin = resp;
      this.putAdminDataToForm();
    });
     
    this.createForms();
  }

  ngOnInit(): void {
  }

  
  createForms() {
    this.formPersonalData = this.formBuilder.group({
      name: [this.admin.name || "", [Validators.required, Validators.minLength(keys.ctrl_name_min_length)]],
      lastname: ["", [Validators.required, Validators.minLength(keys.ctrl_lastname_min_length)]],
      email: ["", [Validators.required, Validators.pattern(keys.ctrl_email_pattern)]]
    });

    this.formPassword = this.formBuilder.group({
      oldPassword: ["", [Validators.required]],
      newPassword: ["", [Validators.required, Validators.minLength(keys.ctrl_password_min_length)]],
      newPasswordConf: ["", [Validators.required, Validators.minLength(keys.ctrl_password_min_length)]]
    })
  }

  validatePersonalForm() {
    this.resetErrors();

    if (this.formPersonalData.valid) {
      this.admin.name = this.formPersonalData.controls.name.value;
      this.admin.lastname = this.formPersonalData.controls.lastname.value;
      this.admin.email = this.formPersonalData.controls.email.value;

      this.databaseService.updatePersonalAdminData(this.admin).subscribe(
        resp => {
          $("#correctModalMessage").text(keys.correct_modal_update_admin_data);
          $('#correctModal').modal('show');
        },
        err => {
          $("#errorModalMessage").html(keys.error_modal_message);
          $('#errorModal').modal('show');
        }
      )
    } else {
      if (this.formPersonalData.controls.name.invalid) this.nameError = true;
      if (this.formPersonalData.controls.lastname.invalid) this.lastnameError = true;
      if (this.formPersonalData.controls.email.invalid) this.emailError = true;
      if (
        this.formPersonalData.controls.name.value === "" &&
        this.formPersonalData.controls.lastname.value === ""&&
        this.formPersonalData.controls.email.value === ""
      ) {
        this.formPersonalDataError = true;
        this.nameError = false;
        this.lastnameError = false;
        this.emailError = false;
      }
    }
  }

  validatePasswordForm() {
    this.resetErrors();

    if (this.formPassword.valid) {
      let credentials: adminCredentialsModel = {
        email: "",
        password: this.formPassword.controls.oldPassword.value
      };

      this.databaseService.passwordMatch(credentials).subscribe(
        resp => {
          if(resp.status === keys.ctrl_successful_result){
            credentials.password = this.formPassword.controls.newPassword.value;
            this.databaseService.updatePassword(credentials).subscribe(
              resp => {
                this.formPassword.reset({oldPassword: "", newPassword: "", newPasswordConf: ""});
                $("#correctModalMessage").text(keys.correct_modal_update_admin_password);
                $('#correctModal').modal('show');
              },
              err => {
                $("#errorModalMessage").html(keys.error_modal_message);
                $('#errorModal').modal('show');
              }
            )
          } else {
            this.oldPasswordMatchError = true;
          }
        },
        err => {
          $("#errorModalMessage").html(keys.error_modal_message);
          $('#errorModal').modal('show');
        }
      );
    } else {
      if (this.formPassword.controls.oldPassword.invalid) this.oldPasswordEmptyError = true;
      if (this.formPassword.controls.newPassword.invalid) this.newPasswordError = true;
      if (this.formPassword.controls.newPasswordConf.invalid) this.newPasswordConfError = true;
      if (
        this.formPassword.controls.oldPassword.value === "" &&
        this.formPassword.controls.newPassword.value === "" &&
        this.formPassword.controls.newPasswordConf.value === ""
      ) {
        this.formPasswordError = true;
        this.oldPasswordEmptyError = false;
        this.newPasswordError = false;
        this.newPasswordConfError = false;
      }
    }
  }

  resetErrors() {
    this.nameError = false;
    this.lastnameError = false;
    this.emailError = false;
    this.formPersonalDataError = false;
    this.oldPasswordEmptyError = false;
    this.oldPasswordMatchError = false;
    this.newPasswordError = false;
    this.newPasswordConfError = false;
    this.formPasswordError = false;
  }

  putAdminDataToForm(){
    this.formPersonalData.controls.name.setValue(this.admin.name);
    this.formPersonalData.controls.lastname.setValue(this.admin.lastname);
    this.formPersonalData.controls.email.setValue(this.admin.email);
  }

}
