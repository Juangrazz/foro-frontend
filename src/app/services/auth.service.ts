import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { DatabaseService } from './database.service';

import keys from '../../global/keys';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokenValid = new BehaviorSubject<Boolean>(false);

  constructor(private databaseService: DatabaseService) { }

  async loggedIn(): Promise<boolean> {

    let valid: boolean;
    try {
      const response = await this.databaseService.verifyToken();
      
      if(response.status === keys.ctrl_successful_result){
        valid = true;
      } else {
        valid = false;
      }
    } catch (error) {
      valid = false;
    }
    return valid;
  }

  logOut(){

  }

  getToken(){
    return sessionStorage.getItem("token");
  }
}
