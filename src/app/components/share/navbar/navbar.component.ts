import { Component, OnInit } from '@angular/core';
import keys from '../../../../keys';
import { ControlService } from '../../../services/control.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  keys = keys;
  
  isAdmin = false;

  constructor(private controlService: ControlService) {
    this.controlService.isAdmin.subscribe((value) => (this.isAdmin = value));
  }

  ngOnInit(): void {
  }

}
