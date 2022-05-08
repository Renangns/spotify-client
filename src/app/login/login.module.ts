import { SafeUrlModule } from './../pipe/safe-url/safe-url.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { CallbackComponent } from './callback/callback.component';



@NgModule({
  declarations: [
    LoginComponent,
    CallbackComponent
  ],
  imports: [
    CommonModule,
    SafeUrlModule
  ]
})
export class LoginModule { }
