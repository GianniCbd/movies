import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {}

  accedi(form: NgForm) {
    console.log(form.value);

    // Verifica se il campo email è valido
    if (!this.isValidEmail(form.value.email)) {
      alert('Questa non è una mail valida');
      return;
    }

    try {
      this.authSrv.login(form.value).subscribe(
        () => {
          this.router.navigate(['/']);
        },
        (error) => {
          alert('Non sei registrato!');
          console.log(error);
        }
      );
    } catch (error) {
      // Handle other errors
      alert('Non sei registrato');
      console.log(error);
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
