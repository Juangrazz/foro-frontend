import { Injectable } from '@angular/core';
import { AdminModel } from '../models/admin.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  adminLogged: AdminModel = new AdminModel();

  constructor() { }
}
