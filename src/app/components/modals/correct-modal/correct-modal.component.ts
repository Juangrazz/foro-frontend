import { Component, OnInit } from '@angular/core';
import keys from 'src/keys';

@Component({
  selector: 'app-correct-modal',
  templateUrl: './correct-modal.component.html',
  styleUrls: ['./correct-modal.component.css']
})
export class CorrectModalComponent implements OnInit {

  keys = keys;
  
  constructor() { }

  ngOnInit(): void {
  }

}
