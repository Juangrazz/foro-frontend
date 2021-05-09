import { Component, OnInit } from '@angular/core';
import keys from 'src/global/keys';
import { CardService } from '../../../../services/card.service';

declare var $: any;

@Component({
  selector: 'app-modify-card',
  templateUrl: './modify-card.component.html',
  styleUrls: ['./modify-card.component.scss']
})
export class ModifyCardComponent implements OnInit {

  keys = keys;

  constructor(private cardService: CardService) {
  }

  ngOnInit(): void {
  }

  savePlace() {
    this.cardService.newPlace = $("#newPlace").val();
    $('#modifyCard').modal('hide')
  }

}
