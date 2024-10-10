import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../services/auth/auth.service';

@Injectable()
export class AnonymousGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

        return new Observable<boolean>((ob: any) => {

            if (!this.authenticationService.isAuthenticated()) {
                ob.next(true);
            } else {
                ob.next(false);
                this.router.navigate(['home']);
            }
        });
    }
}
