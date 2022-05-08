import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) private platformId: string) {}

  ngOnInit(): void {}

  login() {
    const client_id = '3e9e7622f2aa4b08a521410895273924';
    const redirect_uri = 'http://localhost:4200/callback';

    const state = 'a'; //gerar randon string;
    const stateKey = 'b'; //gerar randon string;

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(stateKey, state);
    }

    var scope = 'user-read-private user-read-email';

    let url = "https://accounts.spotify.com/authorize";
        url += "?response_type=token";
        url += "&client_id=" + encodeURIComponent(client_id);
        url += "&scope=" + encodeURIComponent(scope);
        url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
        url += "&state=" + encodeURIComponent(state);

    return url;
  }
}
