import { Component, OnInit } from '@angular/core';
import { ControlService } from '../../../../services/control.service';
import keys from '../../../../../keys';

@Component({
  selector: 'app-mod-admin-info',
  templateUrl: './mod-admin-info.component.html',
  styleUrls: ['./mod-admin-info.component.css']
})
export class ModAdminInfoComponent implements OnInit {

  keys = keys;
  
  constructor(private controlService: ControlService) { 
    this.controlService.isAdmin.next(true);
  }

  ngOnInit(): void {
  }

}
