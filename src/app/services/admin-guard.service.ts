import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuardService {

  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    var isAdmin;
    this.authService.isAdmin.subscribe(admin => (isAdmin = admin));
    if (isAdmin) {
      console.log("true");
      return true;
    } else {
      console.log("false");
      this.router.navigate(['/admin/signin']);
      return false;
    }
  }}
