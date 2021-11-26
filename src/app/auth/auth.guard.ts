import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from './auth.service';
import * as fromRoot from '../app.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthGuard implements CanActivate{
  
    constructor(
        private authService: AuthService,
        private router: Router,
        private store: Store<fromRoot.State>
    ) {}

    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select(fromRoot.getIsAuth)
        
        // if(!this.authService.isAuth()){
        //     this.router.navigate(['/login']);
        // }

        // return true;
    }
}