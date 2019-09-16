import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';

@Injectable()
export class SecurityGuard implements CanActivate {

    constructor(private userService: UserService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.isAuthenticatedOrRedirect();
    }

    private isAuthenticatedOrRedirect() {
        if (this.userService.isLogged) {
            return true;
        }
        this.navigateToSignInPage();
        return false;
    }

    private navigateToSignInPage() {
        this.router.navigateByUrl('/sign-in');
    }

}