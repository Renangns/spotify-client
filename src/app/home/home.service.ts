import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs';
import { base64encode, bytesToBase64 } from '../shared/base64';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) { }

  getUser(tokenType: string, token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${tokenType} ${token}`,
      }),
    };
    return this.http
      .get<any>('https://api.spotify.com/v1/me', httpOptions)
      .pipe(take(1));
  }

  getUserImage(url: string) {
    return this.http.get(url, { responseType: 'arraybuffer' }).pipe(
      map(buffer => bytesToBase64(new Uint8Array(buffer)),
        take(1)
      ));
  }
}
