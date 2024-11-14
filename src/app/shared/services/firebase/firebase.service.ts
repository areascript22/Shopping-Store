import { Injectable } from '@angular/core';
import { Auth, signOut, User } from '@angular/fire/auth';
import { Database, off, onValue, ref, set } from '@angular/fire/database';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  user: User | null = null;
  private driverRefPath: string | null = null;
  private statusRef: any;

  constructor(
    private database: Database,
    private auth: Auth,
    private toastr: ToastrService
  ) {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        console.log('Current user logged in: ', user.uid);
      }
    });
  }

  //Sign Out
  async signOutUser(): Promise<void> {
    try {
      await signOut(this.auth);
      console.log('User signed out successfully');

      // Optionally, navigate to a login or home page after signing out
      // this.router.navigate(['/login']); // Uncomment if using Angular Router
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  //Write request on Realtime Database
  writeData(path: string, data: any): Promise<void> {
    const dbRef = ref(this.database, path);
    return set(dbRef, data);
  }

  //Listener
  listenForDriverChanges(userId: string): void {
    // Remover el listener anterior si ya existe
    if (this.driverRefPath) {
      const prevRef = ref(this.database, this.driverRefPath);
      off(prevRef);
    }

    const path = `requests/${userId}/drivers`;
    const driversRef = ref(this.database, path);

    onValue(
      driversRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const driversData = snapshot.val();
          console.log('Tipo de dato de la respuesta: ', typeof driversData);
          if (driversData != '') {
            console.log(
              'Drivers field updated:',
              typeof driversData,
              driversData
            );
            
            
          }

          let driverId = '';
          // Obtener la key y el value
          Object.entries(driversData).forEach(([key, value]) => {
            driverId = key;
            console.log('Key:', key);
            console.log('Value:', value);
          });

          // Crear la referencia a la ruta en la base de datos.
          this.statusRef = ref(
            this.database,
            `requests/${userId}/drivers/${driverId}/status`
          );
          off(this.statusRef);

          // Agregar un listener para detectar cambios en el campo 'status'.
          onValue(this.statusRef, (snapshot) => {
            const status = snapshot.val();
            if (status) {
              if (status === 'haveArrived') {
                this.toastr.info('','Su pedido ha sido recogido por el motorizado');
                console.log('Status is driver have arrived');
              } else if (status === 'waiting') {
                //
                this.toastr.info('','Pedido en camino');
                console.log('Status is waiting');
              } else if (status == 'finished') {
                this.toastr.info('','El motorizado ha llegado con tu pedido');
              } else {
                console.log('Status is finished');
              }
            } else {
              console.log('No status found');
            }
          });
        } else {
          console.log('No data found at the specified path.');
        }
      },
      (error) => {
        console.error('Error listening for changes:', error);
      }
    );
  }
}
