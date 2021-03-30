import { Component, OnInit } from '@angular/core';
import { ControlService } from '../../../../services/control.service';
import { CardModel } from '../../../../models/card.model';

@Component({
  selector: 'app-check-messages',
  templateUrl: './check-messages.component.html',
  styleUrls: ['./check-messages.component.css']
})
export class CheckMessagesComponent implements OnInit {

  card: CardModel = new CardModel();

  constructor(private controlService: ControlService) { 
    this.controlService.isAdmin.next(true);
  }

  ngOnInit(): void {
  }

}
