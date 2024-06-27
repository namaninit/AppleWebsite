// buy-product.component.ts

import { Component, OnDestroy } from '@angular/core';
import { CartItem, CartService } from '../Services/cart-service.service';
import { MatDialog } from '@angular/material/dialog';
import { PlaceOrderComponent } from '../place-order/place-order.component';
import { ProductServiceService } from '../Services/product-service.service';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent implements OnDestroy{
  discount: number = 0;
  couponCode: string | null = null; // Initialize to null
  couponDiscountPercentage: number = 10;
  isCouponApplied: boolean = false; // Flag to track if the coupon has been applied

  apply(): void {
    // Check if the coupon has already been applied
    if (this.isCouponApplied) {
      console.log('Coupon has already been applied.');
      return;
    }

    // Check if the entered coupon code is valid
    if (this.couponCode === 'naman22') {
      // Apply the discount
      this.discount = this.calculateTotal() * (this.couponDiscountPercentage / 100);
      this.isCouponApplied = true; // Set the flag to true
    } else {
      // Reset the discount if the coupon code is invalid
      this.discount = 0;
      console.log('Invalid coupon code.');
    }

    // Log the details for debugging
    console.log('Coupon Code:', this.couponCode);
    console.log('Discount applied:', this.discount);
  }

  calculateTotal(): number {
    // Implement your total calculation logic here
    // For example, summing up the prices of items in the cart
    const subtotal = this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    // Subtract the discount from the subtotal
    const totalWithDiscount = subtotal - this.discount;

    return totalWithDiscount > 0 ? totalWithDiscount : 0;
  }

  cartItems: CartItem[] = [];

  constructor(private cartService: CartService, public dialog: MatDialog,
    private _productService:ProductServiceService) {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }
  ngOnDestroy(): void {
    this._productService.isBuyButtonDialogClosedSubject.next(false);
  }
 
  removeFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }

  openDialog(): void {
   
    const dialogRef = this.dialog.open(PlaceOrderComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    
    });
    this._productService. isBuyButtonDialogClosedSubject.next(true);
  }

  
}
