import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../interfaces/user.interface';
import { AuthDataService } from './auth-data.service';
import { AuthStateService } from './auth-state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private authDataService: AuthDataService,
    private authStateService: AuthStateService,
    private router: Router
  ) { }

  public login(email: string, password: string): Observable<User> {
    return this.authDataService.login(email, password).pipe(
      tap(response => this.authStateService.setUser(response))
    );
  }

  public logout(): Observable<null> {
    this.authStateService.clearUser();
    this.router.navigateByUrl('/login');
    return of(null);
  }

  public getUser(): Observable<User | null> {
    return this.authStateService.getUser();
  }
  
  public getUsername(): Observable<string | null> {
    return this.authStateService.getUsername();
  }

  public isLoggedIn(): Observable<boolean | undefined> {
    let isLoggedIn;
    this.getUser().pipe(
      tap(value => {
        if (value !== null) {
          isLoggedIn = true;
        } else {
          isLoggedIn = false;
        }
      }),
    ).subscribe();
    return of(isLoggedIn);
  }
}
