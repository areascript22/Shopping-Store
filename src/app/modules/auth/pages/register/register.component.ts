import { Component } from '@angular/core';
import { user } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseErrorCodesService } from '../../../../shared/services/firebase-error-codes.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerUser: FormGroup;
  loading: Boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private firebaseErrorService: FirebaseErrorCodesService
  ) {
    this.registerUser = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatPassword: ['', Validators.required],
    });
  }

  register() {
    const { email, password, repeatPassword } = this.registerUser.value;
    if (password != repeatPassword) {
      this.toastr.error('Las contraseñas no coinsiden', 'Error');
      this.loading = false;
      return;
    }
    this.loading = true;
    //Authentication
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        // this.loading=false;
        // this.toastr.success('User created succesully', 'Succes');
        // this.router.navigate(['/login']);
        // console.log(user);
        this.firebaseErrorService.emailVerification();
      })
      .catch((error) => {
        this.loading = false;
        console.log('An error has ocurred creating user: ' + error);
        this.toastr.error(
          this.firebaseErrorService.firebaseError(error.code),
          'Error'
        );
      });
  }

 
}
