import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { SafeUrlModule } from '../pipe/safe-url/safe-url.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HttpClientModule, BrowserTransferStateModule, SafeUrlModule],
})
export class HomeModule { }
