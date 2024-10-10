import { Injectable } from '@angular/core';
import { IDTokenClaims } from 'oidc-client';
import { IAuthResponse } from '../../interfaces/auth/auth-response.interface';

@Injectable({
    providedIn: 'root'
})
export class TokenManagerService {

    tokenClaims!: IDTokenClaims | null;
    tokenInfo!: IAuthResponse | null;

    constructor() {
        this.tokenInfo = this.getTokenInfo();
     }

    public clearUserAuthInfo(): void {
        localStorage.removeItem('logistica_loggedin');

    }

    public getTokenInfo(): IAuthResponse | null {
        const tokens = localStorage.getItem('logistica_loggedin');
        return tokens ? JSON.parse(tokens) as IAuthResponse : null;
    }
}
