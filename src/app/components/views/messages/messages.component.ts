import { Component, OnInit } from '@angular/core';
import keys from "../../../../keys";

declare var $: any;

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  keys = keys;

  constructor() { 
    $(document).ready(function () {
      var navbar = $("#navbar").height();
      var footer = $("#footer").height();
      var height = $(window).height() - footer - navbar;

      $('.main-container').height(height);
      $(".main-container").addClass("pt-4 pb-4");
    });

    $( window ).resize(function() {
      var navbar = $("#navbar").height();
      var footer = $("#footer").height();
      var height = $(window).height() - footer - navbar;

      $('.main-container').height(height);
    });
  }

  ngOnInit(): void {

  }

}
