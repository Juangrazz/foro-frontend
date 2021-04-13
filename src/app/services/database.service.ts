import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import keys from '../../keys';
import { CardModel } from '../models/card.model';
import { MessageModel } from '../models/message.model';
import { MymyvCardModel } from '../models/mymyv_card.model';
import { CommentModel } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  keys = keys;

  constructor(private http: HttpClient) { }

  createCard(card: CardModel) {
    return this.http.post<MessageModel>(`${keys.db_host}${keys.db_server_path}/cards/createcard`, card);
  }

  createMymyvCard(mymyVCard: MymyvCardModel) {
    return this.http.post<MessageModel>(`${keys.db_host}${keys.db_server_path}/cards/createmymyvcard`, mymyVCard);
  }

  getCards(date: string) {
    return this.http.get<CardModel[]>(`${keys.db_host}${keys.db_server_path}/cards/getcards/${date}`).toPromise();
  }

  getMymyvCards(date: string) {
    return this.http.get<MymyvCardModel[]>(`${keys.db_host}${keys.db_server_path}/cards/getmymyvcards/${date}`).toPromise();
  }

  getCardComments(id_card: number){
    return this.http.get<CommentModel[]>(`${keys.db_host}${keys.db_server_path}/cards/getcardcomments/${id_card}`).toPromise();
  }

  getMymyvCardComments(id_card: number){
    return this.http.get<CommentModel[]>(`${keys.db_host}${keys.db_server_path}/cards/getmymyvcardcomments/${id_card}`).toPromise();
  }


}
