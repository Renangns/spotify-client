import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserTransferStateModule } from '@angular/platform-browser';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HttpClientModule, BrowserTransferStateModule],
})
export class HomeModule {}
