import { Injectable } from '@angular/core';
import { SignUpForm } from '../model/user.model';
import { Credential } from '../model/credential.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_ENDPOINTS } from '../api/api-endpoints';
import { JwtResponse } from '../model/jwt-response.model';
import { TokenStorageService } from '../security/token-storage.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

    constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

    createAccount(signUpForm: SignUpForm): Promise<any> {
        return this.http.post<string>(API_ENDPOINTS.signUp, signUpForm, httpOptions).toPromise();
    }

    authenticate(credential: Credential): Promise<any> {
        return this.http.post<JwtResponse>(API_ENDPOINTS.signIn, credential, httpOptions).toPromise();
    }

    get isLogged(): boolean {
        if (this.tokenStorage.getUsername() && this.tokenStorage.getToken() && this.tokenStorage.getAuthorities()) {
            return true;
        }
        return false;
    }
}