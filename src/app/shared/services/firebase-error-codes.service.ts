import { Injectable } from '@angular/core';
import { FirebaseCodeErrors } from '../utils/firebase.code.error';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FirebaseErrorCodesService {
  constructor(
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router
  ) {}

  //Handle errors: User already exists, etc
  firebaseError(code: string) {
    switch (code) {
      case FirebaseCodeErrors.emailAlreadyInUse:
        return 'El correo ya ha sido registrado';
      case FirebaseCodeErrors.weakPassword:
        return 'Contraseña devil. Ingresa minimo 6 caracteres';
      case FirebaseCodeErrors.invalidEmail:
        return 'Ingresa un correo válido';
      case FirebaseCodeErrors.invalidCredentials:
        return 'Credenciales invalidas';
      default:
        return 'Error desconocido';
    }
  }
  //Email verification
  emailVerification() {
    this.afAuth.currentUser
      .then((user) => user?.sendEmailVerification())
      .then(() => {
        this.toastr.info(
          'Le hemos enviado un email para su verificacion',
          'Verificar email'
        );
        //this.router.navigate(['/login']);
      });
  }
}
