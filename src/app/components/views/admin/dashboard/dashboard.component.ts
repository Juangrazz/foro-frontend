import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { adminCredentialsModel } from '../../../../models/admin_credentials.model';

import { ControlService } from '../../../../services/control.service';
import { DatabaseService } from '../../../../services/database.service';
import { StorageService } from '../../../../services/storage.service';
import { AdminService } from '../../../../services/admin.service';

import keys from '../../../../../global/keys';

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  keys = keys;

  formLogin!: FormGroup;
  adminCredentials: adminCredentialsModel = new adminCredentialsModel();

  emailError: boolean = false;
  passwordError: boolean = false;
  credentialsError: boolean = false;
  formError: boolean = false;

  constructor(private controlService: ControlService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private databaseService: DatabaseService, private storageService: StorageService, private adminService: AdminService) {
    this.controlService.showNavAndFoot.next(false);
    this.createForm();
  }

  ngOnInit(): void {
  }

  login() {
    if (this.formLogin.valid) {
      this.databaseService.checkCredentials(this.adminCredentials).subscribe(
        resp => {
          if (resp.status === keys.ctrl_successful_result) {
            this.controlService.isAdmin.next(true);
            this.databaseService.getToken(this.adminCredentials.email).subscribe(
              resp => {
                if (resp.status === keys.ctrl_successful_result) {
                  this.storageService.setSessionValue(keys.session_storage_token, resp.message);
                  this.router.navigate(["home"], { relativeTo: this.route });
                }
              },
              err => {
                console.error("An error has ocurred");
              }
            )
          } else {
            this.credentialsError = true;
          }
        },
        err => {
          $("#errorModalMessage").text(keys.error_modal_message);
          $('#errorModal').modal('show');
        }
      )
    }
    
  }

  createForm() {
    this.formLogin = this.formBuilder.group({
      email: [this.storageService.getEmail(), [Validators.required, Validators.pattern(keys.ctrl_email_pattern)]],
      password: ['', [Validators.required, Validators.minLength(keys.ctrl_password_min_length)]],
      remember: [this.storageService.getRemember() || false]
    });
  }

  validateForm() {
    this.resetErrors();

    if (this.formLogin.valid) {
      this.adminCredentials.email = this.formLogin.controls.email.value;
      this.adminCredentials.password = this.formLogin.controls.password.value;

      if(this.formLogin.controls.remember.value){
        this.storageService.setEmail(this.formLogin.controls.email.value);
        this.storageService.setRemember(this.formLogin.controls.remember.value);
      } else {
        this.storageService.deleteLocalValue(keys.local_storage_remember);
        this.storageService.deleteLocalValue(keys.local_storage_email);
      }
      this.login();

    } else {
      if (this.formLogin.controls.email.invalid) this.emailError = true;
      if (this.formLogin.controls.password.invalid) this.passwordError = true;
      if (
        this.formLogin.controls.email.value === "" &&
        this.formLogin.controls.password.value === ""
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

  openResetPasswordModal() {
    this.adminService.emailToResetPassword = "";
    $("#emailToResetPassword").val("");
    $('#resetPasswordModal').modal('dispose');
    $('#resetPasswordModal').modal('show');
    $("#resetPasswordModal").on("hidden.bs.modal", () => {
      this.resetPassword();
    });
  }

  resetPassword(){
    let email = this.adminService.emailToResetPassword;
    
    if(email !== "" && email !== null){
      this.databaseService.checkEmail(email)
      .then(resp => {
        if(resp.status === keys.ctrl_successful_result){
          this.databaseService.resetPassword(email)
          .catch(err => {
            $("#errorModalMessage").html(keys.error_modal_message);
            $('#errorModal').modal('show');
          })
        }
        
      })
      .catch(err => {
        $("#errorModalMessage").html(keys.error_modal_message);
        $('#errorModal').modal('show');
      })
      $("#correctModalMessage").html(keys.correct_modal_reset_password);
      $('#correctModal').modal('show');
    }
  }
}
