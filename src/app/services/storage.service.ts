import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  key: string = "zXeQ/$ha8NL/#$L0cPr4";

  constructor() { }

  setEncryptSessionValue(key: string, value: any) {
    let encryptedItem = CryptoJS.AES.encrypt(JSON.stringify(value), this.key).toString();
    sessionStorage.setItem(key, encryptedItem);
  }

  getEncryptSessionValue(key: any): any {
    let item = sessionStorage.getItem(key);
    if(item !== null){
      let decryptValue = CryptoJS.AES.decrypt(item, this.key);
      decryptValue = JSON.parse(decryptValue.toString(CryptoJS.enc.Utf8));
      return decryptValue;
    }
    return null;
  }

  setSessionValue(key: string, value: any){
    sessionStorage.setItem(key, value);
  }

  getSessionValue(key: string): any{
    return sessionStorage.getItem(key);
  }

  deleteSessionValue(key: string){
    sessionStorage.removeItem(key);
  }

  checkSessionValue(key: string): boolean{
    if(sessionStorage.getItem(key)){
      return true;
    } else {
      return false;
    }
    
  }

}
