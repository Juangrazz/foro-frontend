import { Component, OnInit } from '@angular/core';

import { AdminService } from '../../../../services/admin.service';

import keys from 'src/global/keys';

declare var $: any;

@Component({
  selector: 'app-reset-password-modal',
  templateUrl: './reset-password-modal.component.html',
  styleUrls: ['./reset-password-modal.component.scss']
})
export class ResetPasswordModalComponent implements OnInit {

  keys = keys;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
  }

  saveEmail(){
    this.adminService.emailToResetPassword = $("#emailToResetPassword").val().trim();
    $('#resetPasswordModal').modal('hide');
  }

}
