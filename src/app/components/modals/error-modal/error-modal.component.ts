import { Component, OnInit } from '@angular/core';
import keys from 'src/global/keys';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss']
})
export class ErrorModalComponent implements OnInit {

  keys = keys;
  
  constructor() { }

  ngOnInit(): void {
  }

}
