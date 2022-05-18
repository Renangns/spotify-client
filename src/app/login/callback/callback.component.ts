import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { Auth } from './../../models/auth';
import { AuthService } from './../../shared/services/auth.service';
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
    @Inject(PLATFORM_ID)
    private platformId: string,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.route.fragment.subscribe((fragment) => {
        const response = new URLSearchParams(fragment?.toString());
        const auth = this.parse(response);
        this.create(auth);
        this.authService.save(auth);
        window.location.href = '/home';
      });
    }
  }

  private parse(response: URLSearchParams): Auth {
    const access_token = response.get('access_token') || '';
    const token_type = response.get('token_type') || '';
    const expires_in = parseInt(response.get('expires_in') || '', 10);
    const state = response.get('state') || '';
    return { access_token, token_type, expires_in, state };
  }

  private create(auth: Auth) {
    this.store.dispatch(addAuth({ auth }));
  }
}
