import { isPlatformBrowser } from '@angular/common';
import { HomeService } from './home.service';
import { selectAuth } from './../state/auth/auth.selector';
import { Auth } from './../models/auth';
import { Store } from '@ngrx/store';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { TransferState, makeStateKey } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private store: Store<{ auth: Auth }>,
    private service: HomeService,
    @Inject(PLATFORM_ID)
    private platformId: string
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const auth = this.store.select('auth');
      auth.subscribe((res) => {
        this.service
          .getUser(res.token_type, res.access_token)
          .subscribe((res) => console.log(res));
      });
    }
  }
}
