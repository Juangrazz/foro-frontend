import { Component, OnInit } from '@angular/core';

import keys from 'src/global/keys';

@Component({
  selector: 'app-correct-modal',
  templateUrl: './correct-modal.component.html',
  styleUrls: ['./correct-modal.component.scss']
})
export class CorrectModalComponent implements OnInit {

  keys = keys;
  
  constructor() { }

  ngOnInit(): void {
  }

}
