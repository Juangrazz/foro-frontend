import { Component, OnInit } from '@angular/core';
import keys from 'src/global/keys';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss']
})
export class InfoModalComponent implements OnInit {

  keys = keys;

  constructor() { }

  ngOnInit(): void {
  }

}
