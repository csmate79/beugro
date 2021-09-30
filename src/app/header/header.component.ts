import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { User } from '../auth/interfaces/user.interface';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {    
  public user!: User | null;

  public userSub!: Subscription;
  // Auth State Service törlése, és auth service használata (async pipe)
  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  public ngOnInit(): void {
    this.userSub = this.authService.getUser().pipe(
      tap((user: User | null) => this.user = user),
    ).subscribe();
  }

  public logOutUser() {
    this.authService.logout().pipe(
      first(),
      tap(() => this.router.navigate(['/login'])),
    ).subscribe();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
