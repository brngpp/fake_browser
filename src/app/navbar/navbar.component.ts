import { Router } from '@angular/router';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../autenticazione/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  admin = false;
  userSub!: Subscription;
  isAuthenticated = false;

  constructor(
    
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user; //!user ? false : true
    });
  }
  
  OnLogOut() {
    this.authService.user.next(null);
    this.router.navigate(['./result']);

  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe;
  }
}
