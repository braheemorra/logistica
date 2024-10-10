export interface IAuthResponse {
    access_token: string;
    token_type: string;
    refresh_token: string;
    exp: number;
    expires_in: number;
}