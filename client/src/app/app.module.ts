import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';

import { PreloaderComponent } from './shared/components/preloader/preloader.component';
import { PositionsFormComponent } from './pages/categories/categories-form/positions-form/positions-form.component';
import { OrderCategoriesComponent } from './pages/order/order-categories/order-categories.component';
import { OrderPositionsComponent } from './pages/order/order-positions/order-positions.component';
import { HistoryListComponent } from './pages/history/history-list/history-list.component';
import { HistoryFilterComponent } from './pages/history/history-filter/history-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    RegisterComponent,
    OverviewComponent,
    AnalyticsComponent,
    HistoryComponent,
    OrderComponent,
    CategoriesComponent,
    PreloaderComponent,
    CategoriesFormComponent,
    PositionsFormComponent,
    OrderCategoriesComponent,
    OrderPositionsComponent,
    HistoryListComponent,
    HistoryFilterComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule, ReactiveFormsModule, HttpClientModule],
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
