import { Component, OnInit } from '@angular/core';

import { AdminModel } from 'src/app/models/admin.model';

import { ControlService } from '../../../../services/control.service';
import { DatabaseService } from '../../../../services/database.service';

import keys from '../../../../../global/keys';

declare var $: any;

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  keys = keys;
  adminData: AdminModel = new AdminModel();
  
  constructor(private controlService: ControlService, private databaseService: DatabaseService) { 
    this.controlService.showNavAndFoot.next(true);
    this.controlService.isAdmin.next(true);

    this.getAdminData();
  }

  ngOnInit(): void {

  }

  getAdminData(){
    this.databaseService.getAdminData()
    .then(resp => {
      this.adminData = resp;
    })
    .catch(err => {
      $("#errorModalMessage").html(keys.error_modal_message_2);
      $('#errorModal').modal('show');
    });
  }

  deleteAccount() {
    $("#warningModalMessage").html(keys.warning_modal_text);
    $('#warningModal').modal('show');
  }

}
