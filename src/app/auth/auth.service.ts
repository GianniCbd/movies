import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError, tap, catchError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwtHelper = new JwtHelperService();
  apiURL = environment.apiURL;
  private authSubj = new BehaviorSubject<null | AuthData>(null);
  utente!: AuthData;
  user$ = this.authSubj.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(data: { email: string; password: string }) {
    return this.http.post<AuthData>(`${this.apiURL}login`, data).pipe(
      tap((loggato) => {
        console.log(loggato);
        this.authSubj.next(loggato);
        this.utente = loggato;
        console.log(this.utente);
        localStorage.setItem('user', JSON.stringify(loggato));
      }),
      catchError(this.errors)
    );
  }

  restore() {
    const user = localStorage.getItem('user');
    if (!user) {
      return;
    }
    const userData: AuthData = JSON.parse(user);
    if (this.jwtHelper.isTokenExpired(userData.accessToken)) {
      return;
    }
    this.authSubj.next(userData);
  }

  register(data: {
    nome: string;
    cognome: string;
    email: string;
    password: string;
  }) {
    return this.http.post(`${this.apiURL}/register`, data);
  }

  logout() {
    this.authSubj.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  private errors(err: any) {
    switch (err.error) {
      case 'Email already exists':
        return throwError('Email già registrata');
        break;

      case 'Email  format is invalid':
        return throwError('Formato mail non valido');
        break;

      default:
        return throwError('Errore nella chiamata');
        break;
    }
  }
}
