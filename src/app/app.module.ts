import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';

import { AngularFireModule } from '@angular/fire/compat';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';

import { AngularFireAuthModule } from '@angular/fire/compat/auth'; // For Authentication
import { AngularFireDatabaseModule } from '@angular/fire/compat/database'; // For Realtime Database
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { environment } from '../environment/environment';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  //  SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule, // Add this if you're using Firebase Auth
    AngularFireDatabaseModule, // Add this if you're using Firebase Realtime Database
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    HttpClientModule,
  ],
  // exports:[
  //   SpinnerComponent,
  // ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideStorage(() => getStorage())
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
