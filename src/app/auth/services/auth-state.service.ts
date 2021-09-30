import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  
  private user = new BehaviorSubject<User | null>(null);

  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    protected localStorage: LocalStorage
  ) { }

  /**
   * Beállítjuk a user BehaviorSubject-et és a user-t localStorage-ba elmentjük.
   */
  public setUser(user: User): void {
    this.user.next(user);
    this.storage.set('user', user);
  }

  public clearUser(): void {
    this.user.next(null);
    this.storage.remove('user');
  }

  public getUser(): Observable<User | null> {
    return this.user.asObservable();
  }
  

  /**
   * Visszaállítja az alkalmazás bejelentkezett állapotát
   */
  public restoreSession(): Observable<any> {
    return of(null).pipe(
      tap(() => {
        const user = this.storage.get('user');
        if (user) {
          this.user.next(user);
        }
      }),
    ) as any;
  }
}
