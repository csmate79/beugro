import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
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

  private users: User[] = [
    {
      userName: 'mate',
      email: 'asd@asd.com',
      password: 'a',
      permission: [Permission.ADMIN, Permission.SUPERADMIN, Permission.GROUP_LEADER],
      sessionToken: 'asd2gawe2',
      sessionTokenExpirationDate: new Date()
    },
    {
      userName: 'test',
      email: 'b@b.com',
      password: 'b',
      permission: [Permission.USER],
      sessionToken: 'asd2dda2',
      sessionTokenExpirationDate: new Date()
    },
    {
      userName: 'geza',
      email: 'c@c.com',
      password: 'c',
      permission: [Permission.SUPERADMIN],
      sessionToken: 'asd2d231',
      sessionTokenExpirationDate: new Date()
    },
  ]

  constructor() {}

  public login(email: string, password: string): Observable<User> {
    const user = this.users.find(x => x.email === email && x.password === password);

    if (!user) {
      return throwError({ errorCode: 'WRONG_AUTH_DATA' });
    }

    return of(user);
  }
}