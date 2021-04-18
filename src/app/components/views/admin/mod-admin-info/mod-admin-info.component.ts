import { Component, OnInit } from '@angular/core';
import { ControlService } from '../../../../services/control.service';
import keys from '../../../../../global/keys';

@Component({
  selector: 'app-mod-admin-info',
  templateUrl: './mod-admin-info.component.html',
  styleUrls: ['./mod-admin-info.component.scss']
})
export class ModAdminInfoComponent implements OnInit {

  keys = keys;
  
  constructor(private controlService: ControlService) { 
    this.controlService.isAdmin.next(true);
  }

  ngOnInit(): void {
  }

}
