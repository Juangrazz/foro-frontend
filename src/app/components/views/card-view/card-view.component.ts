import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { CardService } from '../../../services/card.service';
import { CommentsService } from '../../../services/comments.service';
import { CommentModel } from '../../../models/comment.model';
import { DatabaseService } from '../../../services/database.service';

import keys from '../../../../global/keys';
import * as moment from 'moment';
import { ControlService } from '../../../services/control.service';

declare var $: any;

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss']
})
export class CardViewComponent implements OnInit {

  keys = keys;

  card: any = {};
  comments: CommentModel[] = [];
  noComments: boolean = false;
  commentToSend: CommentModel = new CommentModel();

  commentForm!: FormGroup;
  commentError: boolean = false;
  instaError: boolean = false;
  formError: boolean = false;

  constructor(private formBuilder: FormBuilder, private cardService: CardService, private commentsService: CommentsService, private databaseService: DatabaseService, private controlService: ControlService) {
    this.createFrom();
    this.card = this.cardService.individualCard;
    this.getComments();
  }

  ngOnInit(): void {
    $("#info-container").css({ "border-bottom-right-radius": "0", "border-bottom-left-radius": "0" });
    $("#card-container").removeClass("p-2").addClass("pl-2").addClass("pr-2").addClass("pt-2");
    $("#card-global-container").removeClass("mb-5");
  }

  async getComments() {
    if (this.card.model_type === keys.ctrl_model_card_normal_type) {
      await this.databaseService.getCardComments(this.card.id)
        .then(res => {
          this.comments = res;
          this.comments = this.controlService.commentsFormatter(this.comments);
          this.checkComments();
        })
        .catch(err => {
          $("#errorModalMessage").html(keys.error_modal_message_2);
          $('#errorModal').modal('show');
        });
    } else {
      await this.databaseService.getMymyvCardComments(this.card.id)
        .then(res => {
          this.comments = res;
          this.comments = this.controlService.commentsFormatter(this.comments);
          this.checkComments();
        })
        .catch(err => {
          $("#errorModalMessage").html(keys.error_modal_message_2);
          $('#errorModal').modal('show');
        });;
      this.comments = this.controlService.commentsFormatter(this.comments);
    }
    this.checkComments();
  }

  checkComments() {
    if (this.comments.length === 0) {
      this.noComments = true;
    } else {
      this.noComments = false;
    }
  }

  createFrom() {
    this.commentForm = this.formBuilder.group({
      comment: ['', [Validators.required]],
      instagram: ['', this.controlService.validateInstagram()]
    });
  }

  validateForm() {

    this.resetErrors();
    if (this.commentForm.valid) {
      this.commentToSend.card_id = this.card.id;
      this.commentToSend.comment = this.commentForm.controls.comment.value;
      this.commentToSend.instagram = this.commentForm.controls.instagram.value;
      this.commentToSend.publication_date = moment().format("DD-MM-YYYY HH:mm:ss");

      if (this.commentToSend.instagram === "" || this.commentToSend.instagram === null) {
        this.commentToSend.instagram = keys.cards_txt_anonymous;
      }

      if(this.card.model_type === keys.ctrl_model_card_normal_type){
        this.databaseService.sendCardComment(this.commentToSend).subscribe(
          (resp) => {
            if (resp.status === keys.ctrl_fail_result) {
              $("#errorModalMessage").text(keys.error_modal_message);
              $('#errorModal').modal('show');
            } else if (resp.status === keys.ctrl_successful_result) {
              $("#correctModalMessage").text(keys.correct_modal_comment);
              $('#correctModal').modal('show');
              $('#correctModal').on('hidden.bs.modal', () => {
                this.commentForm.reset();
                this.getComments();
              });
            }
          },
          (err) => {
            $("#errorModalMessage").text(keys.error_modal_message);
            $('#errorModal').modal('show');
          }
        )
      } else {
        this.databaseService.sendMymyvCardComment(this.commentToSend).subscribe(
          (resp) => {
            if (resp.status === keys.ctrl_fail_result) {
              $("#errorModalMessage").text(keys.error_modal_message);
              $('#errorModal').modal('show');
            } else if (resp.status === keys.ctrl_successful_result) {
              $("#correctModalMessage").text(keys.correct_modal_comment);
              $('#correctModal').modal('show');
              $('#correctModal').on('hidden.bs.modal', () => {
                this.commentForm.reset();
                this.getComments();
              });
            }
          },
          (err) => {
            $("#errorModalMessage").text(keys.error_modal_message);
            $('#errorModal').modal('show');
          }
        )
      }

      
    } else {
      if (this.commentForm.controls.comment.invalid) this.commentError = true;
      if (this.commentForm.controls.instagram.invalid) this.instaError = true;
      if (
        this.commentForm.controls.comment.value === "" &&
        this.commentForm.controls.instagram.value === ""
      ) {
        this.formError = true;
        this.commentError = false;
        this.instaError = false;
      }
    }
  }

  resetErrors() {
    this.formError = false;
    this.commentError = false;
    this.instaError = false;
  }

  commentToSendFormatter() {
    console.log(this.controlService.commentToSendFormatter(this.commentForm.controls.comment.value));
  }

}
