import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseErrorCodesService } from '../../../../shared/services/firebase-error-codes.service';



@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrl: './password-recovery.component.css'
})
export class PasswordRecoveryComponent {
  userRecover:FormGroup;
  loading:boolean = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private firebaseErrorService:FirebaseErrorCodesService
  ) {
    this. userRecover = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
    });
  }

  //Paswword recovery
  recover(){
    this.loading=true;
    const {email} = this.userRecover.value;
    this.afAuth.sendPasswordResetEmail(email).then(
      ()=>{
        this.toastr.success('Te hemos enviado un correo para reestablecer tu contraseña','Succes');
        this.router.navigate(['/login']);
      }
    ).catch(
      (error)=>{
        this.loading=false;
        this.toastr.error(this.firebaseErrorService.firebaseError(error.code),'Error');
      }
    );
  }
}
