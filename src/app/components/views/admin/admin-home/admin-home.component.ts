import { Component, OnInit } from '@angular/core';
import { ControlService } from '../../../../services/control.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(private controlService: ControlService) { 
    this.controlService.showNavAndFoot.next(true);
    this.controlService.isAdmin.next(true);
  }

  ngOnInit(): void {
  }

}
