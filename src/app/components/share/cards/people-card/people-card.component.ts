import { Component, Input, OnInit } from '@angular/core';

import { PeopleCardModel } from '../../../../models/people_card.model';

import keys from '../../../../../global/keys';

@Component({
  selector: 'app-people-card',
  templateUrl: './people-card.component.html',
  styleUrls: ['./people-card.component.scss']
})
export class PeopleCardComponent implements OnInit {

  @Input('card')
  peopleCard: PeopleCardModel = new PeopleCardModel();

  keys = keys;

  constructor() { }

  ngOnInit(): void {
  }

}
