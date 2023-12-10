import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Users } from '../models/users';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  apiURL = environment.apiURL;

  constructor(private http: HttpClient) {}

  recuperaUtente(userId: number): Observable<Users> {
    return this.http.get<Users>(`${this.apiURL}users/${userId}`);
  }
}
