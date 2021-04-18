import { Component, OnInit } from '@angular/core';
import { ControlService } from '../../../../services/control.service';
import keys from '../../../../../global/keys';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.scss']
})
export class CreateAdminComponent implements OnInit {

  keys = keys;
  
  constructor(private controlService: ControlService) { 
    this.controlService.isAdmin.next(true);
  }

  ngOnInit(): void {
  }

}
