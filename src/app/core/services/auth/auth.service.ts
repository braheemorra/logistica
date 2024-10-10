import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { TokenManagerService } from './token-manager.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    
    constructor(
        private tokenManager: TokenManagerService
    ) {
    }
    
    isAuthenticated(): boolean {
        const tokenInfo = this.tokenManager.getTokenInfo();
        let auth = false;

        if (tokenInfo) {
            auth = true;
        }

        return auth;
    }

    login(loginInfo: any): Observable<any> {
        let login: any = {
            status: 'failed'
        };
    
        if (loginInfo.login === '1234567890' && loginInfo.password === 'Totvs@123') {
            login.status = 'success';
            return of(login);
        }
    
        const errorResponse = new HttpErrorResponse({
            error: 'Credenciais Inválidas',
            status: 403,
            statusText: 'Bad Request'
        });
    
        return throwError(errorResponse);
    }

    logout(): any {
        this.tokenManager.clearUserAuthInfo();
    }
}
