import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../auth/interfaces/user.interface';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {    
  public user!: Observable<User | null>;
  public userName: Observable<string | null> = this.authService.getUsername();

  // Auth State Service törlése, és auth service használata (async pipe)
  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.getUser().pipe(
      tap((user: any) => this.user = user),
    ).subscribe();

    this.userName = this.authService.getUsername();
    console.log(this.authService.getUsername());
    
  }

  logOutUser() {
    this.authService.logout();
  }

  getUserName(): Observable<User | null> {
    return this.user.pipe(
      tap((userName: any) => this.userName = userName?.userName)
    );
  }
}
