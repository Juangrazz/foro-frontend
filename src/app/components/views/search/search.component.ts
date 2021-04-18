import { Component, OnInit } from '@angular/core';
import keys from '../../../../global/keys';

declare var $: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
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
