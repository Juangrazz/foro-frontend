import { Component, OnInit } from '@angular/core';
import keys from '../../../../keys';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  keys = keys;

  constructor() {}

  ngOnInit(): void {
  }

}
