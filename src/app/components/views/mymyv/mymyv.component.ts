import { Component, OnInit } from '@angular/core';
import keys from '../../../../keys';

@Component({
  selector: 'app-myhyv',
  templateUrl: './mymyv.component.html',
  styleUrls: ['./mymyv.component.css']
})
export class MymyvComponent implements OnInit {

  keys = keys;
  
  constructor() { }

  ngOnInit(): void {
  }

}
