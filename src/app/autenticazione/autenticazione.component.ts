import { Router } from '@angular/router';
import { AuthService, AuthResponseData } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-autenticazione',
  templateUrl: './autenticazione.component.html',
  styleUrls: ['./autenticazione.component.css'],
})
export class AutenticazioneComponent implements OnInit {
  loginMode: boolean = true;
  reCostructor = new RegExp('[a-zA-Z]{4,}[0-9]*[^w]', 'g'); //upgrade registrazione
  error!: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}
  
  MathPassword(control: FormControl) {} // upgrade registrazione

  switchMode() {
    this.loginMode = !this.loginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const user = form.value.user;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    authObs = this.authService.logIn(user, password);

    authObs.subscribe(
      () => {
        this.router.navigate(['./result']);
      },
      (errorMessage: string) => {
        this.error = errorMessage;
      }
    );
    form.reset();
  }
}
