import { Component, OnInit } from '@angular/core';
import keys from '../../../../../../global/keys';
import { ControlService } from '../../../../../services/control.service';
import { CardService } from '../../../../../services/card.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  keys = keys;
  card: any;
  
  constructor(private controlService: ControlService, private cardService: CardService) { 
    this.controlService.isAdmin.next(true);
    this.card = this.cardService.individualCard;
  }

  ngOnInit(): void {
  }

}
