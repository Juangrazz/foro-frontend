import { Component, Input, OnInit } from '@angular/core';
import { CommentModel } from '../../../../models/comment.model';
import keys from '../../../../../keys';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input('comment')
  comment: CommentModel = new CommentModel();

  keys = keys;
  
  constructor() {
    
  }

  ngOnInit(): void {
  }

}
