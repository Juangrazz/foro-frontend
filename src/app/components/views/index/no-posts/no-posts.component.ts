import { Component, OnInit } from '@angular/core';
import keys from '../../../../../global/keys';

declare var $: any;

@Component({
  selector: 'app-no-posts',
  templateUrl: './no-posts.component.html',
  styleUrls: ['./no-posts.component.scss']
})
export class NoPostsComponent implements OnInit {

  keys = keys;
  constructor() { }

  ngOnInit(): void {
  }

  heartBeat() {
    $("#index-heart").addClass("animate__animated animate__heartBeat slow");
    
    setTimeout(() => {
      $("#index-heart").removeClass("animate__animated animate__heartBeat slow");
    }, 1000);
  }

  openModal(){
    $("#infoModalMessage").html(keys.info_modal_message);
    $('#infoModal').modal('show');
  }

}
