import { Component, OnInit } from '@angular/core';
import { ControlService } from '../../../../services/control.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import keys from '../../../../../keys';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  keys = keys;
  formLogin!: FormGroup;
  
  constructor(private controlService: ControlService, private formBuilder: FormBuilder, private router: Router) {
    this.controlService.showNavAndFoot.next(false);
    this.createForm();
  }

  ngOnInit(): void {
  }

  login(){
    this.controlService.isAdmin.next(true);
    this.router.navigate(["/admin_home"]);
  }

  createForm() {
    this.formLogin = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

}
