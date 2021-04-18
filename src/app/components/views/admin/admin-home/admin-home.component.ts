import { Component, OnInit } from '@angular/core';
import { ControlService } from '../../../../services/control.service';
import keys from '../../../../../global/keys';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  keys = keys;
  
  constructor(private controlService: ControlService) { 
    this.controlService.showNavAndFoot.next(true);
    this.controlService.isAdmin.next(true);
  }

  ngOnInit(): void {
  }

}
