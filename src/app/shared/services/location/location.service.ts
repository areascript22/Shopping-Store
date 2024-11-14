import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor() {}

  //GEt the phyducal current location 
  getCurrentLocation(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => resolve(position),
          (error) => reject(error)
        );
      } else {
        reject(new Error('Geolocation is not supported by this browser.'));
      }
    });
  }
}
