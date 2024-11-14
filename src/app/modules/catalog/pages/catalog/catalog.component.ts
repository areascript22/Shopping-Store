import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { LocationService } from '../../../../shared/services/location/location.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
})
export class CatalogComponent implements OnInit {
  products: any[] = [];
  location: { latitude: number; longitude: number } | null = null;
  cartItemsCount: number = 0;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private locationService: LocationService,
  ) {}

  ngOnInit(): void {
    //Products
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });

    this.cartService.cartItems$.subscribe((items) => {
      this.cartItemsCount = items.length;
    });

    //GEt current location
    this.locationService.getCurrentLocation()
      .then(position => {
        this.location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        console.log(this.location);
      })
      .catch(error => {
        console.error('Error getting location', error);
      });
  }

  //Add item to Shopping Cart
  addToCart(product: any): void {
    this.cartService.addToCart(product);
    alert(`${product.title} has been added to the cart!`);
  }
}
