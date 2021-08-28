import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { first, tap } from 'rxjs/operators';
import { AuthService } from '../auth/services/auth.service';
import { ErrorResponse } from '../shared/interfaces/error-response.interface';
import { SharedService } from '../shared/shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MyErrorStateMatcher } from '../shared/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public matcher = new MyErrorStateMatcher();

  constructor(
    private sharedService: SharedService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private snackbar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  onLogin() {
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).pipe(
      first(),
      tap({
        error: (err: ErrorResponse)  => {
          if (err.errorCode === 'WRONG_AUTH_DATA') {
            this.snackbar.open('Sikertelen bejelentkezés!', 'Bezár', {
              panelClass: ['error-snackbar'],
            })
          }
        },
        complete: () => {
          this.sharedService.openSnackBar('login');
          this.router.navigateByUrl('/objects');
        }
      }),
    ).subscribe();
  }
}
