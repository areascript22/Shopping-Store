import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { EmailVerificationComponent } from './pages/email-verification/email-verification.component';
import { PasswordRecoveryComponent } from './pages/password-recovery/password-recovery.component';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent,
  },
  {
    path:'register',
    component:RegisterComponent,
  },
  {
    path:'email-verification',
    component:EmailVerificationComponent,
  },
  {
    path:'password-recovery',
    component:PasswordRecoveryComponent,
  },
  {
    path:'**',
    redirectTo:'/auth/login'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
