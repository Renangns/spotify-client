import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Auth } from 'src/app/models/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly KEY: string = 'auth';

  constructor(private cookieService: CookieService) {}

  save(auth: Auth) {
    this.cookieService.putObject(this.KEY, auth);
  }

  get(): Auth {
    return JSON.parse(this.cookieService.get(this.KEY) || '') as Auth;
  }

  // TODO: validar tbm se já não esta expirado o tempo do token
  hasObject(): boolean {
    return this.get() ? true : false;
  }
}
