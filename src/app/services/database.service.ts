import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CardModel } from '../models/card.model';
import { MessageModel } from '../models/message.model';
import { MymyvCardModel } from '../models/mymyv_card.model';
import { CommentModel } from '../models/comment.model';
import { StatisticsModel } from '../models/statistics.model';
import { StatisticsCardsModel } from '../models/statistics_cards.model';
import { NormalSearchModel } from '../models/normal_search.model';
import { MymyvSearchModel } from '../models/mymyv_search_model';
import { AdminModel } from '../models/admin.model';
import { CardAcceptRejectModel } from '../models/card-accept-reject.model';
import { adminCredentialsModel } from '../models/admin_credentials.model';

import keys from '../../global/keys';


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

  getCardComments(id_card: number) {
    return this.http.get<CommentModel[]>(`${keys.db_host}${keys.db_server_path}/cards/getcardcomments/${id_card}`).toPromise();
  }

  getMymyvCardComments(id_card: number) {
    return this.http.get<CommentModel[]>(`${keys.db_host}${keys.db_server_path}/cards/getmymyvcardcomments/${id_card}`).toPromise();
  }

  getStatisticsPlacesAllTime() {
    return this.http.get<StatisticsModel[]>(`${keys.db_host}${keys.db_server_path}/cards/getstatisticsplacesalltime`).toPromise();
  }

  getStatisticsPlacesThirtyDays() {
    return this.http.get<StatisticsModel[]>(`${keys.db_host}${keys.db_server_path}/cards/getstatisticsplacesthirtydays`).toPromise();
  }

  getStatisticsMymyvCardsSevenDays() {
    return this.http.get<StatisticsModel[]>(`${keys.db_host}${keys.db_server_path}/cards/getstatisticsmymyvcardssevendays`).toPromise();
  }

  getStatisticsCardsSevenDays() {
    return this.http.get<StatisticsCardsModel[]>(`${keys.db_host}${keys.db_server_path}/cards/getstatisticscardssevendays`).toPromise();
  }

  sendCardComment(comment: CommentModel) {
    return this.http.post<MessageModel>(`${keys.db_host}${keys.db_server_path}/cards/sendCardComment`, comment);
  }

  sendMymyvCardComment(comment: CommentModel) {
    return this.http.post<MessageModel>(`${keys.db_host}${keys.db_server_path}/cards/sendMymyvCardComment`, comment);
  }

  normalSearch(search: NormalSearchModel) {
    return this.http.post<CardModel[]>(`${keys.db_host}${keys.db_server_path}/cards/normalSearch`, search);
  }

  mymyvSearch(search: MymyvSearchModel) {
    return this.http.post<MymyvCardModel[]>(`${keys.db_host}${keys.db_server_path}/cards/mymyvSearch`, search);
  }

  createAdmin(admin: AdminModel) {
    return this.http.post<MessageModel>(`${keys.db_host}${keys.db_server_path}/admin/createAdmin`, admin);
  }

  getOlderCard() {
    return this.http.get<any>(`${keys.db_host}${keys.db_server_path}/admin/getoldercard`).toPromise();
  }

  acceptCard(infoToSend: CardAcceptRejectModel) {
    return this.http.put<MessageModel>(`${keys.db_host}${keys.db_server_path}/admin/acceptcard`, infoToSend);
  }

  acceptMymyvCard(infoToSend: CardAcceptRejectModel) {
    return this.http.put<MessageModel>(`${keys.db_host}${keys.db_server_path}/admin/acceptmymyvcard`, infoToSend);
  }

  rejectCard(infoToSend: CardAcceptRejectModel) {
    return this.http.delete<MessageModel>(`${keys.db_host}${keys.db_server_path}/admin/rejectcard/${infoToSend.card_id}`);
  }

  rejectMymyvCard(infoToSend: CardAcceptRejectModel) {
    return this.http.delete<MessageModel>(`${keys.db_host}${keys.db_server_path}/admin/rejectmymyvcard/${infoToSend.card_id}`);
  }

  updateCardPlace(card: CardModel) {
    return this.http.put<MessageModel>(`${keys.db_host}${keys.db_server_path}/admin/updateCardPlace`, card);
  }

  checkCredentials(admin: adminCredentialsModel) {
    return this.http.post<MessageModel>(`${keys.db_host}${keys.db_server_path}/auth/checkcredentials`, admin);
  }

  getAdminData() {
    return this.http.get<AdminModel>(`${keys.db_host}${keys.db_server_path}/admin/getadmindata`).toPromise();
  }

  getToken(email: string) {
    return this.http.get<MessageModel>(`${keys.db_host}${keys.db_server_path}/auth/gettoken/${email}`);
  }

  verifyToken() {
    return this.http.get<MessageModel>(`${keys.db_host}${keys.db_server_path}/auth/verifytoken`).toPromise();
  }

  updatePersonalAdminData(admin: AdminModel) {
    return this.http.post<MessageModel>(`${keys.db_host}${keys.db_server_path}/admin/updateadmindata`, admin);
  }

  passwordMatch(credentials: adminCredentialsModel) {
    return this.http.post<MessageModel>(`${keys.db_host}${keys.db_server_path}/admin/checkpassword`, credentials);
  }

  updatePassword(credentials: adminCredentialsModel) {
    return this.http.post<MessageModel>(`${keys.db_host}${keys.db_server_path}/admin/updatepassword`, credentials);
  }

  checkEmail(email: string) {
    return this.http.get<MessageModel>(`${keys.db_host}${keys.db_server_path}/admin/checkemail/${email}`).toPromise();
  }

}
