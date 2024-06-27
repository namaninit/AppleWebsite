// cart-service.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  imageUrl: string;
  title: string;
  subtitle: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  addToCart(product: any): void {
    const currentItems = this.cartItemsSubject.value;
    const updatedItems = [...currentItems, {
      imageUrl: product.imageUrl,
      title: product.title,
      subtitle: product.subtitle,
      price: product.price,
      quantity: 1,
    }];
    this.cartItemsSubject.next(updatedItems);
  }

  removeFromCart(item: CartItem): void {
    const currentItems = this.cartItemsSubject.value;
    const updatedItems = currentItems.filter((cartItem) => cartItem !== item);
    this.cartItemsSubject.next(updatedItems);
  }

  updateItem(item: CartItem, updatedProperties: Partial<CartItem>): void {
    const currentItems = this.cartItemsSubject.value;
    const updatedItems = currentItems.map((cartItem) => {
      if (cartItem === item) {
        return { ...cartItem, ...updatedProperties };
      } else {
        return cartItem;
      }
    });
    this.cartItemsSubject.next(updatedItems);
  }

  increaseQuantity(item: CartItem): void {
    this.updateItem(item, { quantity: item.quantity + 1 });
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      this.updateItem(item, { quantity: item.quantity - 1 });
    }
  }

  getCartItemCount(): number {
    const currentItems = this.cartItemsSubject.value;
    return currentItems.reduce((total, item) => total + item.quantity, 0);
  }
}
