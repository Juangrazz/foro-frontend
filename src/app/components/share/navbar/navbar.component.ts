import { Component, OnInit } from '@angular/core';
import keys from '../../../../keys';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

   title: string;
   nav_option_1: string;
   nav_option_2: string;
   nav_option_3: string;
   nav_option_4: string;
   nav_option_5: string;


  constructor() { 
    this.title = keys.nav_title;
    this.nav_option_1 = keys.nav_option_1;
    this.nav_option_2 = keys.nav_option_2;
    this.nav_option_3 = keys.nav_option_3;
    this.nav_option_4 = keys.nav_option_4;
    this.nav_option_5 = keys.nav_option_5;

  }

  ngOnInit(): void {
  }

}
