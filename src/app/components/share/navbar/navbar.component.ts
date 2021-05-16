import { Component, OnInit } from '@angular/core';
import keys from '../../../../global/keys';
import { ControlService } from '../../../services/control.service';
import { StorageService } from '../../../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  keys = keys;
  
  isAdmin = false;

  constructor(private controlService: ControlService, private storageService: StorageService, private router: Router) {
    this.controlService.isAdmin.subscribe((value) => (this.isAdmin = value));
  }

  ngOnInit(): void {
  }

  closeSession(){
      this.storageService.deleteSessionValue(keys.session_storage_token);
      this.router.navigate(["admin_dashboard"]);
  }

}
