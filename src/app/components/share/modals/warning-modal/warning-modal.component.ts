import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StorageService } from '../../../../services/storage.service';
import { DatabaseService } from '../../../../services/database.service';

import keys from 'src/global/keys';
declare var $: any;

@Component({
  selector: 'app-warning-modal',
  templateUrl: './warning-modal.component.html',
  styleUrls: ['./warning-modal.component.scss']
})
export class WarningModalComponent implements OnInit {

  keys = keys;

  constructor(private databaseService: DatabaseService, private router: Router, private storageService: StorageService) { }

  ngOnInit(): void {
  }

  deleteAccount(){
    this.databaseService.deleteAdmin()
    .then(resp => {
      if(resp.status === keys.ctrl_successful_result){
        this.router.navigate(["admin_dashboard"]);
        this.storageService.deleteLocalValue(keys.local_storage_remember);
        this.storageService.deleteLocalValue(keys.local_storage_email);
      }
    })
    .catch(err => {
      $("#errorModalMessage").html(keys.error_modal_message_2);
      $('#errorModal').modal('show');
    })
  }

}
