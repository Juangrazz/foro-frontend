import { Component, OnInit } from '@angular/core';
import keys from "../../../../keys";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  keys = keys;

  constructor() { 
  }

  ngOnInit(): void {

  }

}
