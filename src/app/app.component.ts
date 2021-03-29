import { Component } from '@angular/core';
import { AdminService } from './services/admin.service';
import { ControlService } from './services/control.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  show: boolean = true;

  constructor(private controlService: ControlService){
    this.controlService.showNavAndFoot.subscribe((value) => (this.show = value));
  }
}
