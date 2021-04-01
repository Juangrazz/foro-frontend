import { Component, OnInit } from '@angular/core';
import keys from 'src/keys';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.css']
})
export class ErrorModalComponent implements OnInit {

  keys = keys;
  
  constructor() { }

  ngOnInit(): void {
  }

}
