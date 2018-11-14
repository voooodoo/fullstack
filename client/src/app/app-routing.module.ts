import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './shared/guards/auth.guards';
import { OverviewComponent } from './pages/overview/overview.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { HistoryComponent } from './pages/history/history.component';
import { OrderComponent } from './pages/order/order.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  {
    path: '',
    component: SiteLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'overview',
        component: OverviewComponent,
      },
      {
        path: 'analytics',
        component: AnalyticsComponent,
      },
      {
        path: 'history',
        component: HistoryComponent,
      },
      {
        path: 'order',
        component: OrderComponent,
      },
      {
        path: 'categories',
        component: CategoriesComponent,
      },
      {
        path: 'categories/new',
        component: CategoriesFormComponent,
      },
      {
        path: 'categories/:id',
        component: CategoriesFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
