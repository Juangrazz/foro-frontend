import { Component, OnInit } from '@angular/core';
import keys from '../../../../../keys';

@Component({
  selector: 'app-normal-search',
  templateUrl: './normal-search.component.html',
  styleUrls: ['./normal-search.component.css']
})
export class NormalSearchComponent implements OnInit {

  keys = keys;
  
  constructor() { }

  ngOnInit(): void {
  }

}
