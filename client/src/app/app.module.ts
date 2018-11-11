import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { RegisterComponent } from './pages/register/register.component';
import { TokenInterceptor } from './shared/guards/token.interceptor';
import { OverviewComponent } from './pages/overview/overview.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { HistoryComponent } from './pages/history/history.component';
import { OrderComponent } from './pages/order/order.component';
import { CategoriesComponent } from './pages/categories/categories.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, AuthLayoutComponent, SiteLayoutComponent, RegisterComponent, OverviewComponent, AnalyticsComponent, HistoryComponent, OrderComponent, CategoriesComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
