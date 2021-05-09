import { Component, OnInit } from '@angular/core';
import keys from 'src/global/keys';

@Component({
  selector: 'app-no-post-to-check',
  templateUrl: './no-post-to-check.component.html',
  styleUrls: ['./no-post-to-check.component.scss']
})
export class NoPostToCheckComponent implements OnInit {

  keys = keys;
  
  constructor() { }

  ngOnInit(): void {
  }

}
