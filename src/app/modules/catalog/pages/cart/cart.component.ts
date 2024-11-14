// cart.component.ts
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { FirebaseService } from '../../../../shared/services/firebase/firebase.service';
import { LocationService } from '../../../../shared/services/location/location.service';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(
    private cartService: CartService,
    private firebaseService: FirebaseService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
    });
  }

  removeItem(product: any): void {
    this.cartService.removeFromCart(product);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  //Write data on Realtime database
  async writeToDatabase() {
    try {
      // Get current location
      const currentPosition: GeolocationPosition =
        await this.locationService.getCurrentLocation();
      // Convert the GeolocationPosition to a string
      const positionString: string = `${currentPosition.coords.latitude},  ${currentPosition.coords.longitude}`;
      console.log('Current Position:', currentPosition);

      // Get user ID
      const userId = this.firebaseService.user?.uid;
      if (!userId) {
        throw new Error('User ID is undefined');
      }
      console.log('User ID:', userId);

      // Write request to Realtime Database
      await this.firebaseService
        .writeData(`requests/${userId}`, {
          pick_up: positionString,
          drop_off: `-1.657107, -78.678071`,
          products:this.cartItems,
          status:'pending',
        })
        .catch((error) => {
          console.log('ERROR: ', error);
        });
      console.log('Data written successfully');
    } catch (error) {
      console.error(
        'An error has occurred trying to write request on Firebase Realtime:',
        error
      );
    }
  }
}
