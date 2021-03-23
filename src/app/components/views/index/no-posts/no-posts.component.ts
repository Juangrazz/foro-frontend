import { Component, OnInit } from '@angular/core';
import keys from '../../../../../keys';

@Component({
  selector: 'app-no-posts',
  templateUrl: './no-posts.component.html',
  styleUrls: ['./no-posts.component.css']
})
export class NoPostsComponent implements OnInit {

  keys = keys;
  constructor() { }

  ngOnInit(): void {
  }

}
