import { Component, OnInit } from '@angular/core';

import { StorageService } from '../../../services/storage.service';

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
  
  constructor(private storageService: StorageService) { 
    this.storageService.deleteSessionValue(keys.session_storage_individual_card);
  }

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
