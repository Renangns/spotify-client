import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { HomeService } from './home.service';
import { selectAuth } from './../state/auth/auth.selector';
import { Auth } from './../models/auth';
import { Store } from '@ngrx/store';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie';
import { tap } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: any = {};

  constructor(
    private service: HomeService,
    @Inject(PLATFORM_ID)
    private platformId: string,
    private authService: AuthService,
    private transferState: TransferState
  ) {}

  ngOnInit(): void {
    const USER_KEY = makeStateKey<any>('user');

    if (isPlatformServer(this.platformId)) {
      const auth = this.authService.get();
      this.service
        .getUser(auth.token_type, auth.access_token)
        .subscribe((user) => {
          this.transferState.set(USER_KEY, user);
        });
    } else {
      this.user = this.transferState.get<any>(USER_KEY, null);
      this.transferState.remove(USER_KEY);
    }
  }
}
