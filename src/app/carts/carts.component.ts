import { Component, OnDestroy } from '@angular/core';
import { CartItem, CartService } from '../Services/cart-service.service';
import { BuyProductComponent } from '../buy-product/buy-product.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductServiceService } from '../Services/product-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css']
})
export class CartsComponent  implements OnDestroy {
  cartItems: CartItem[] = [];
  subscription = new Subscription;
  constructor(private cartService: CartService,public dialog: MatDialog,
    private _productService:ProductServiceService) {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
  increaseQuantity(item: CartItem): void {
    this.cartService.increaseQuantity(item);
  }
  decreaseQuantity(item: CartItem): void {
    this.cartService.decreaseQuantity(item);
  }
  // Function to remove an item from the cart
  removeFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }

  openDialog() {
   
    const dialogRef = this.dialog.open(BuyProductComponent, {
      data: { cartItems: this.cartItems }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
   this.subscription= this._productService.isBuyButtonDialogClosedSubject.subscribe((res)=>{
      if(res){
       dialogRef.close() 
      }
    })
  }
}
