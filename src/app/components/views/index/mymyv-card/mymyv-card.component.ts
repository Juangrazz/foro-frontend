import { Component, Input, OnInit } from '@angular/core';
import { MymyvCardModel } from '../../../../models/mymyv_card.model';

import keys from '../../../../../keys';

@Component({
  selector: 'app-mymyv-card',
  templateUrl: './mymyv-card.component.html',
  styleUrls: ['./mymyv-card.component.css']
})
export class MymyvCardComponent implements OnInit {

  @Input('card')
  mymyvCard: MymyvCardModel = new MymyvCardModel();

  keys = keys;

  constructor() { }

  ngOnInit(): void {
  }

}
