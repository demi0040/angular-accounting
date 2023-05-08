import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DonorComponent } from './pages/donor/donor.component';
import { IncomeComponent } from './pages/income/income.component';
import { ExpenseComponent } from './pages/expense/expense.component';
import { ReportComponent } from './pages/report/report.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    DonorComponent,
    IncomeComponent,
    ExpenseComponent,
    ReportComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }