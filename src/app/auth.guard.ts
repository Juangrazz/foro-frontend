import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { DatabaseService } from './services/database.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private databaseService: DatabaseService) {

  }

  async canActivate() {
    const tokenValid = await this.authService.loggedIn();
    if (tokenValid) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }

}
