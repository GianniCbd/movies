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
  registrationForm: FormGroup;

  constructor(
    private authSrv: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.registrationForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      cognome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  registra() {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
      try {
        this.authSrv.register(this.registrationForm.value).subscribe(
          (response) => {
            // Handle successful registration
            console.log(response);
            this.router.navigate(['/login']); // Redirect to login after successful registration
          },
          (error) => {
            console.error(error);
            alert('Registration failed. Please try again.');
          }
        );
      } catch (error: any) {
        console.log(error);
        alert(error);
        this.router.navigate(['/register']);
      }
    } else {
      alert('Please fill out the form correctly.');
    }
  }
}
