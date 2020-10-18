import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    var isAuth;
    this.authService.isAuth.subscribe(authentified => (isAuth = authentified));
    if (isAuth) {
      console.log("true");
      return true;
    } else {
      console.log("false");
      this.router.navigate(['/signin']);
      return false;
    }
  }
}
