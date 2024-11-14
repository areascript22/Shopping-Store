import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { EmailVerificationComponent } from './pages/email-verification/email-verification.component';
import { PasswordRecoveryComponent } from './pages/password-recovery/password-recovery.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    EmailVerificationComponent,
    PasswordRecoveryComponent,
   
  
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    ReactiveFormsModule,
   
    
  ]
})
export class AuthModule { }
