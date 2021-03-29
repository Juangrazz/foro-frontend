import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControlService {

  showNavAndFoot = new BehaviorSubject<boolean>(true);
  isAdmin = new BehaviorSubject<boolean>(false);

  constructor() { }
}
