import { Component, OnInit } from '@angular/core';

import { StorageService } from '../../../services/storage.service';

import keys from '../../../../global/keys';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent implements OnInit {

  keys = keys;

  constructor(private storageService: StorageService) {
    this.storageService.deleteSessionValue(keys.session_storage_individual_card);
  }

  ngOnInit(): void {
  }

}
