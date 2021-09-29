import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Permission } from '../enums/permission.enum';
import { User } from '../interfaces/user.interface';

/**
 * Adatokat szólgáltató service, illetve itt végezzük a bejelentkezést végző logikát.
 * Itt lesznek definiálva a userek egy privát változóban.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthDataService {
  private apiServerUrl = environment.apiBaseUrl;

  private users!: User[];

  constructor(
    private http: HttpClient
  ) {}

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/users`);
  }

  public login(email: string, password: string): Observable<User> {
    this.getUsers().pipe(
      tap(users => {
        this.users = users;
    })).subscribe();

    const user = this.users?.find(x => x.email === email && x.password === password);

    if (!user) {
      return throwError({ errorCode: 'WRONG_AUTH_DATA' });
    }
    
    return of(user);
  }
}