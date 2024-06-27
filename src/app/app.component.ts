import { Component } from '@angular/core';
import { CartService } from './Services/cart-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RetailShop';
  cartBadgeValue: number = 0;

  constructor(private cartService: CartService) {
    // Initialize cartBadgeValue with the current cart item count
    this.cartBadgeValue = this.cartService.getCartItemCount();

    // Subscribe to changes in the cart item count
    this.cartService.cartItems$.subscribe(items => {
      this.cartBadgeValue = items.length;
    });
  }
}
