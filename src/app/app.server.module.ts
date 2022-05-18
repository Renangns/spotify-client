import { NgModule } from '@angular/core';
import {
  ServerModule,
  ServerTransferStateModule,
} from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { CookieBackendModule } from 'ngx-cookie-backend';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    CookieBackendModule.withOptions(),
    ServerTransferStateModule,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
