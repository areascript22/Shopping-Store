import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FirebaseErrorCodesService } from '../../../../shared/services/firebase-error-codes.service';
import { ToastrService } from 'ngx-toastr';
//import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userForm:FormGroup;
  loading:boolean = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private firebaseErrorService:FirebaseErrorCodesService
  ) {
    this. userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  //log in
  login(){
    this.loading=true;
    const {email,password}  = this.userForm.value;
    this.afAuth.signInWithEmailAndPassword(email,password).then(
      user=>{
        // console.log("A user just logged in");
        // console.log(user);
        this.loading=false;
        if(user.user?.emailVerified){
          this.router.navigate(['/']);
        }else{
          this.firebaseErrorService.emailVerification();
          this.router.navigate(['/auth/email-verification']);
        }
       
      }
    ).catch(
      (error)=>{
        this.loading=false;
        console.log("An error ahs ocurred logging in: "+error);
        this.toastr.error(this.firebaseErrorService.firebaseError(error.code),'Error');
      }
    );
  }
//


}
