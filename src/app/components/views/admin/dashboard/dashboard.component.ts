import { Component, OnInit } from '@angular/core';
import { ControlService } from '../../../../services/control.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import keys from '../../../../../global/keys';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  keys = keys;
  formLogin!: FormGroup;

  constructor(private controlService: ControlService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.controlService.showNavAndFoot.next(false);
    this.createForm();
  }

  ngOnInit(): void {
  }

  login(){
    this.controlService.isAdmin.next(true);
    this.router.navigate(["home"], {relativeTo:this.route});
  }

  createForm() {
    this.formLogin = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

}
