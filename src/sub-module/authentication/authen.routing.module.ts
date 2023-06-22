import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/shared/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { OwnerManagementComponent } from './owner-management/owner-management.component';
import { OwnerFormComponent } from './owner-form/owner-form.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserFormComponent } from './user-form/user-form.component';
import { RoleManagementComponent } from './role-management/role-management.component';
import { RoleFormComponent } from './role-form/role-form.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'owner-management', component: OwnerManagementComponent, canActivate: [AuthGuard] },
  { path: 'owner-form', component: OwnerFormComponent, canActivate: [AuthGuard] },
  { path: 'owner-form/:ownerId', component: OwnerFormComponent, canActivate: [AuthGuard] },
  { path: 'user-management', component: UserManagementComponent, canActivate: [AuthGuard] },
  { path: 'user-form', component: UserFormComponent, canActivate: [AuthGuard] },
  { path: 'user-form/:userId', component: UserFormComponent, canActivate: [AuthGuard] },
  { path: 'role-management', component: RoleManagementComponent, canActivate: [AuthGuard] },
  { path: 'role-form', component: RoleFormComponent, canActivate: [AuthGuard] },
  { path: 'role-form/:roleId', component: RoleFormComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AuthenRoutingModule { }
