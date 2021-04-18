import { Component, OnInit } from '@angular/core';
import keys from '../../../../../../global/keys';
import { ControlService } from '../../../../../services/control.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  keys = keys;
  
  constructor(private controlService: ControlService) { 
    this.controlService.isAdmin.next(true);
  }

  ngOnInit(): void {
  }

}
