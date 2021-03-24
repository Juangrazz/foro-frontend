import { Component, OnInit } from '@angular/core';
import keys from '../../../../../keys';

@Component({
  selector: 'app-search-mymyv',
  templateUrl: './search-mymyv.component.html',
  styleUrls: ['./search-mymyv.component.css']
})
export class SearchMymyvComponent implements OnInit {

  keys = keys;
  
  constructor() { }

  ngOnInit(): void {
  }

}
