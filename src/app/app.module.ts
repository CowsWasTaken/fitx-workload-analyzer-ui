import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {NgChartsModule} from "ng2-charts";
import {ChartComponent} from "./chart/chart.component";
import { StudioSelectComponent } from './studio-select/studio-select.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import { MillisToReadablePipe } from './pipes/ms-to-min.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    StudioSelectComponent,
    MillisToReadablePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, AppRoutingModule, HttpClientModule, NgChartsModule, BrowserAnimationsModule, MatTableModule, MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
