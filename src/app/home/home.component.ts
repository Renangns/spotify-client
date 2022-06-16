import { isPlatformServer } from '@angular/common';
import { HomeService } from './home.service';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { AuthService } from '../shared/services/auth.service';
import { base64ToBytes } from '../shared/base64';

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
  ) { }

  ngOnInit(): void {
    const USER_KEY = makeStateKey<any>('user');
    const USER_IMAGE = makeStateKey<any>('userImage');

    if (isPlatformServer(this.platformId)) {
      const auth = this.authService.get();
      this.service
        .getUser(auth.token_type, auth.access_token)
        .subscribe((user) => {
          this.transferState.set(USER_KEY, user);
          this.service.getUserImage(user.images[0].url).subscribe(res => {
            this.transferState.set(USER_IMAGE, res);
          });
        });

    } else {
      this.user = this.transferState.get<any>(USER_KEY, null);
      this.transferState.remove(USER_KEY);
      this.user.image = this.arrayBufferToBase64Image(this.transferState.get<any>(USER_IMAGE, null));
      this.transferState.remove(USER_IMAGE);
    }
  }

  arrayBufferToBase64Image(base64String: string) {
    const buffer = base64ToBytes(base64String);
    const blob = new Blob([buffer], { type: 'image/jpeg' });
    const urlCreator = window.URL || window.webkitURL;
    return urlCreator.createObjectURL(blob);
  }
}
