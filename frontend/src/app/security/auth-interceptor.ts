
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { TokenStorageService } from './token-storage.service';

const AUTHORIZATION_HEADER = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private tokenStorage: TokenStorageService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        let authReq = request;
        const token = this.tokenStorage.getToken();
        if (token) {
            this.setBearerHeader(request, token);
            authReq = this.cloneRequest(request);
        }
        return next.handle(authReq);
    }

    private setBearerHeader(request: HttpRequest<any>, token: string) {
        request.headers.set(AUTHORIZATION_HEADER, `Bearer ${token}`);
    }

    private cloneRequest(request: HttpRequest<any>) {
        return request.clone({ headers: request.headers });
    }

}

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];