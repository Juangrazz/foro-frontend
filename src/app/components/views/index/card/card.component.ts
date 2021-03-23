import { Component, Input, OnInit } from '@angular/core';
import { CardModel } from '../../../../models/card.model';
import keys from '../../../../../keys';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input('cardsArray')
  cards: CardModel[] = [];

  keys = keys;

  constructor() { 
    
  }

  ngOnInit(): void {
  }

}
