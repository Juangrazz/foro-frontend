import { Component, OnInit } from '@angular/core';
import keys from 'src/global/keys';

@Component({
  selector: 'app-no-results',
  templateUrl: './no-results.component.html',
  styleUrls: ['./no-results.component.scss']
})
export class NoResultsComponent implements OnInit {

  keys = keys;

  constructor() { }

  ngOnInit(): void {
  }

}
