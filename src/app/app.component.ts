import { Component, OnInit } from '@angular/core';
import { AccountService } from './core/account.service';
import { UserProfile } from './model/user-profile';
import { MatDialog } from '@angular/material';
import { Utils } from './core/utils';
import { AuthService } from './core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit {
  userProfile: UserProfile;
  firstLogin = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private _acctService: AccountService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    if (window.location.href.indexOf('?postLogout=true') > 0) {
      console.log('performing cleanup');
      this.authService.signoutRedirectCallback().then(() => {
        console.log('back from signout');
        let url: string = this.router.url.substring(
          0,
          this.router.url.indexOf('?')
        );
        this.router.navigateByUrl(url);
      });
    }
  }

  login(): void {
    this.authService.login();
  }

  logout(): void {
    this.authService.logout();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  isAdmin() {
    return this.authService.authContext &&
      this.authService.authContext.claims &&
      (this.authService.authContext.claims.find(c =>
        c.type === 'http://schemas.microsoft.com/ws/2008/06/identity/cleams/role' &&
        c.value === 'Admin'));
  }
}
