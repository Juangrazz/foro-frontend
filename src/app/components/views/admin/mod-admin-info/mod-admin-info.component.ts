import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ControlService } from '../../../../services/control.service';

import keys from '../../../../../global/keys';
import { AdminModel } from 'src/app/models/admin.model';
import { DatabaseService } from '../../../../services/database.service';

@Component({
  selector: 'app-mod-admin-info',
  templateUrl: './mod-admin-info.component.html',
  styleUrls: ['./mod-admin-info.component.scss']
})
export class ModAdminInfoComponent implements OnInit {

  keys = keys;

  formModAdminData!: FormGroup;
  admin: AdminModel = new AdminModel();

  emailError: boolean = false;
  passwordError: boolean = false;
  credentialsError: boolean = false;
  formError: boolean = false;

  constructor(private controlService: ControlService, private formBuilder: FormBuilder, private databaseService: DatabaseService) { 
    this.controlService.isAdmin.next(true);
    this.databaseService.getAdminData().then(resp => {
      this.admin = resp;
    });
    
      
    this.createForm();
  }

  ngOnInit(): void {
  }

  
  createForm() {
    this.formModAdminData = this.formBuilder.group({
      name: [this.admin.name || "", [Validators.required, Validators.minLength(keys.ctrl_name_min_length)]],
      lastname: ["", [Validators.required, Validators.minLength(keys.ctrl_lastname_min_length)]],
      email: ["", [Validators.required, Validators.pattern(keys.ctrl_email_pattern)]],
      oldPassword: ["", [Validators.required, Validators.minLength(keys.ctrl_password_min_length)]],
      newPassword: ["", [Validators.required, Validators.minLength(keys.ctrl_password_min_length)]],
      newPasswordConf: ["", [Validators.required, Validators.minLength(keys.ctrl_password_min_length)]]
    });
  }

  validateForm() {
    this.resetErrors();

    if (this.formModAdminData.valid) {

    } else {
      if (this.formModAdminData.controls.email.invalid) this.emailError = true;
      if (this.formModAdminData.controls.password.invalid) this.passwordError = true;
      if (
        this.formModAdminData.controls.email.value === "" &&
        this.formModAdminData.controls.password.value === ""
      ) {
        this.formError = true;
        this.emailError = false;
        this.passwordError = false;
      }
    }
  }

  resetErrors() {
    this.formError = false;
    this.emailError = false;
    this.passwordError = false;
    this.credentialsError = false;
  }

}
