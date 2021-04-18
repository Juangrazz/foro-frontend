import { Component, OnInit } from '@angular/core';
import keys from '../../../../../global/keys';

@Component({
  selector: 'app-normal-search',
  templateUrl: './normal-search.component.html',
  styleUrls: ['./normal-search.component.scss']
})
export class NormalSearchComponent implements OnInit {

  keys = keys;
  
  constructor() { }

  ngOnInit(): void {
  }

}
