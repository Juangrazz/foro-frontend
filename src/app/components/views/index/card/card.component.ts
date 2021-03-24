import { Component, Input, OnInit } from '@angular/core';
import { CardModel } from '../../../../models/card.model';
import keys from '../../../../../keys';
import { CardService } from '../../../../services/card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input('card')
  card: CardModel = new CardModel();

  keys = keys;

  constructor(public cardService: CardService) {
  }

  ngOnInit(): void {
  }

  saveCard(){
    sessionStorage.setItem("individual_card", JSON.stringify(this.card));
    this.cardService.individualCard = this.card;
  };

}
