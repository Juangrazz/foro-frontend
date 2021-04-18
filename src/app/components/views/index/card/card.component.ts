import { Component, Input, OnInit } from '@angular/core';
import { CardModel } from '../../../../models/card.model';

import keys from '../../../../../global/keys';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input('card')
  card: CardModel = new CardModel();

  keys = keys;

  constructor() {}

  ngOnInit(): void {
  }

}
