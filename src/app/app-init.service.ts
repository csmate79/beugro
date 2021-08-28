import { Injectable }  from '@angular/core';
import { AuthStateService } from './auth/services/auth-state.service';
 
@Injectable({
    providedIn: 'root',
})
export class AppInitService {
 
    constructor(
        private authStateService: AuthStateService,
    ) {
    }
    
    public init(): Promise<void> {
        return this.authStateService.restoreSession().toPromise();
    }
}