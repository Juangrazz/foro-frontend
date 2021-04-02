import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import keys from '../../keys';
import { CardModel } from '../models/card.model';
import { MessageModel } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  keys = keys;

  constructor(private http: HttpClient) { }

  createCard(card: CardModel) {
    return this.http.post<MessageModel>(`${keys.db_host}${keys.db_server_path}/cards/createcard`, card);
  }

  getCards() {
    return this.http.get<CardModel[]>(`${keys.db_host}${keys.db_server_path}/cards/getcards`);
  }
}
