import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import keys from '../../keys';
import { CardModel } from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  keys = keys;

  constructor(private http: HttpClient) { }

  createCard(card: CardModel) {
    return this.http.post(`${keys.db_host}${keys.db_server_path}/cards/createcard`, card);
  }
}
