import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Auth } from './../../models/auth';

@Injectable({
  providedIn: 'root',
})
export class CallbackResolver implements Resolve<Auth | undefined> {
  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    private route: ActivatedRoute
  ) {}

  resolve(): Observable<Auth | undefined> {
    if (isPlatformBrowser(this.platformId)) {
      this.route.fragment.subscribe((fragment) => {
        const response = new URLSearchParams(fragment?.toString());
        const access_token = response.get('access_token');
        const token_type = response.get('token_type');
        const expires_in = response.get('expires_in');
        const state = response.get('state');
        console.log(access_token, token_type, expires_in, state)
        return of({ access_token, token_type, expires_in, state });
      });
    }

    return of(undefined);
  }
}
