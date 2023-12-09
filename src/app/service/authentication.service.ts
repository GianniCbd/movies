import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private currentUser: any;

  constructor() {}

  setCurrentUser(user: any): void {
    this.currentUser = user;
  }

  getCurrentUser(): any {
    return this.currentUser;
  }
}
