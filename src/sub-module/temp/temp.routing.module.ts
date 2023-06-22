import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TempMenuComponent } from './temp-menu/temp-menu.component';
import { AuthGuard } from 'src/shared/auth.guard';

const routes: Routes = [
  { path: ':page', component: TempMenuComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class TempRoutingModule { }
