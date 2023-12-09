import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  // qua dichiaro una variabile per il form di registrazione di tipo FormGroup
  registrationForm: FormGroup;
  // Nel costruttore, ho iniettato AuthService, Router e FormBuilder
  constructor(
    private authSrv: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    // qua inizializzo il form di registrazione con i campi e le regole di validazione
    this.registrationForm = this.fb.group({
      nome: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[a-zA-Z]+$/),
        ],
      ],
      cognome: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[a-zA-Z]+$/),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}
  // Definisco un metodo chiamato 'registra' per gestire la registrazione
  registra() {
    // Controllo se il form è valido
    if (this.registrationForm.valid) {
      // Se valido, stampa i valori del form nella console
      console.log(this.registrationForm.value);
      try {
        // Prova a registrare l'utente chiamando il metodo register del servizio AuthService
        this.authSrv.register(this.registrationForm.value).subscribe(
          // Se la registrazione ha successo, stampa la risposta e reindirizza l'utente alla pagina di login
          (response) => {
            console.log(response);
            this.router.navigate(['/login']);
          },
          // Se c'è un errore durante la registrazione, stampa l'errore e mostra un avviso
          (error) => {
            console.error(error);
            alert('Registration failed. Please try again.');
          }
        );
      } catch (error: any) {
        // Se c'è un errore durante la registrazione, stampa l'errore nella console e mostra un avviso
        console.log(error);
        alert(error);
        this.router.navigate(['/register']);
      }
    } else {
      // Se il form non è valido, mostra un avviso
      alert('Perfavore compila il Form correttamente.');
    }
  }
}
