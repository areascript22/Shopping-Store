// cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cart.asObservable();

  addToCart(product: any): void {
    const currentCart = this.cart.value;
    this.cart.next([...currentCart, product]);
  }

  getCartItems(): any[] {
    return this.cart.value;
  }

  removeFromCart(product: any): void {
    const currentCart = this.cart.value.filter(item => item.id !== product.id);
    this.cart.next(currentCart);
  }

  clearCart(): void {
    this.cart.next([]);
  }
}
