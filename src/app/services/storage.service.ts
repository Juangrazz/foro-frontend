import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  key: string = "zXeQ/$ha8NL/#$L0cPr4";

  constructor() { }

  setEncryptSessionValue(key: string, value: any) {
    let prueba = CryptoJS.AES.encrypt(JSON.stringify(value), this.key).toString();
    sessionStorage.setItem(key, prueba);
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

}
