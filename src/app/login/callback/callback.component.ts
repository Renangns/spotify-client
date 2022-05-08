import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Auth } from './../../models/auth';
import { addAuth } from './../../state/auth/auth.action';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css'],
})
export class CallbackComponent implements OnInit {

  constructor(
    private store: Store<{ auth: Auth }>,
    private route: ActivatedRoute,
    private router: Router,@Inject(PLATFORM_ID)
    private platformId: string
    ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.route.fragment.subscribe((fragment) => {
        const response = new URLSearchParams(fragment?.toString());
        const access_token = response.get('access_token') || '';
        const token_type = response.get('token_type') || '';
        const expires_in = parseInt(response.get('expires_in') || '', 10) ;
        const state = response.get('state') || '';
        this.create({ access_token, token_type, expires_in, state });
        this.router.navigate(['/home']);
      })
    }
  }

  create(auth: Auth) {
    this.store.dispatch(addAuth({ auth }));
  }
}
