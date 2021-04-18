import { Component } from '@angular/core';
import { ControlService } from './services/control.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  show: boolean = true;

  constructor(private controlService: ControlService){
    this.controlService.showNavAndFoot.subscribe((value) => (this.show = value));
  }
}
