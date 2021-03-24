import { Component, OnInit } from '@angular/core';
import keys from '../../../../keys';

declare var $: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  keys = keys;
  mymyvActived = false;
  
  constructor() { }

  ngOnInit(): void {
  }

  checkbox(target: any){
    if(target.checked) {
      this.mymyvActived = true;
    } else {
      this.mymyvActived = false;
    }
  }
}
