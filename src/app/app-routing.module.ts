import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/shared/home/home.component';
import { MasterDesignComponent } from 'src/shared/master-design/master-design.component';
import { AuthGuard } from 'src/shared/auth.guard';
import { NotFoundComponent } from 'src/shared/layouts/not-found/not-found.component';
import { DashboardComponent } from 'src/shared/dashboard/dashboard.component';

const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'master-design', component: MasterDesignComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '404', component: NotFoundComponent, canActivate: [AuthGuard] },
  // authentication
  { path: 'auth', loadChildren: () => import('../sub-module/authentication/authen.routing.module').then((m) => m.AuthenRoutingModule) },
  // setting
  { path: 'setting', loadChildren: () => import('../sub-module/setting/setting.routing.module').then((m) => m.SettingRoutingModule) },
  // order
  { path: 'order', loadChildren: () => import('../sub-module/order/order.routing.module').then((m) => m.OrderRoutingModule) },
  // temp
  { path: 'temp', loadChildren: () => import('../sub-module/temp/temp.routing.module').then((m) => m.TempRoutingModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
