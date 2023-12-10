import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Users } from 'src/app/models/users';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  user: Users | null = null;

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    const userId = 1;

    this.authService.recuperaUtente(userId).subscribe(
      (data) => {
        console.log('Dati utente:', data);
        this.user = data;
      },
      (error) => {
        console.error("Errore nel recupero dell'utente:", error);
      }
    );
  }
}
