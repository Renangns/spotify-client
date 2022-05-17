import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  getUser(tokenType: string, token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${tokenType} ${token}`,
      }),
    };
    console.log(`${tokenType} ${token}`);
    return this.http
      .get<any>('https://api.spotify.com/v1/me', httpOptions)
      .pipe(take(1));
  }
}
