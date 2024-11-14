import { Injectable } from '@angular/core';
import { Auth, User } from '@angular/fire/auth';
import { Database, ref, set } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
   user:User | null = null;
  constructor(private database: Database, private auth: Auth) {
    this.auth.onAuthStateChanged((user)=>{
      if(user){
          this.user = user;
          console.log("Current user logged in: ", user.uid);
      }
    });
  }
  
  //Write request on Realtime Database
  writeData(path: string, data: any): Promise<void> {
    const dbRef = ref(this.database, path);
    return set(dbRef, data);
  }
}
