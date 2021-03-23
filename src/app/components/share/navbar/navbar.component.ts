import { Component, OnInit } from '@angular/core';
import keys from '../../../../keys';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  keys = keys;


  constructor() {}

  ngOnInit(): void {
  }

}
