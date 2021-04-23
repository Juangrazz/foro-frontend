import { Component, OnInit } from '@angular/core';
import keys from '../../../../global/keys';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent implements OnInit {

  keys = keys;

  constructor() {
    sessionStorage.removeItem("normal_search");
    sessionStorage.removeItem("mymyv_search");
  }

  ngOnInit(): void {
  }

}
