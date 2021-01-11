import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LaunchService } from './launch.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LaunchFilterComponent } from './launch-filters/launch-filter.component';
import { LaunchDataComponent } from './launch-data/launch-data.component';

@NgModule({
  declarations: [
    AppComponent,
    LaunchFilterComponent,
    LaunchDataComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    CommonModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [LaunchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
