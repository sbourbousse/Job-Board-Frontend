import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  isAuth: boolean = false;
  constructor(
    private authService : AuthService,
    private router : Router
    ) {}
  ngOnInit() {
    this.authService.isAuth.subscribe(isAuth => (this.isAuth = isAuth));
  }

  disconnect() {
    this.authService.logOutUser();
    this.router.navigate(['/']);
  }
  test() {
    var test = false;
    this.authService.isAdmin.subscribe(value => test = value)
    console.log(test);
  }
  
}
