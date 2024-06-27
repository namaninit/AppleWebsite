// products.component.ts

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { CartService } from '../Services/cart-service.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  images: string[] = [
    '../../assets/image1.jpg',
    '../../assets/image2.jpg',
    '../../assets/image3.jpg',
    // Add more image URLs as needed
  ];
  currentIndex: number = 0;
  
  // Declare cartBadgeValue property
  cartBadgeValue: number = 0;

  constructor(public dialog: MatDialog, private cartService: CartService, private http: HttpClient, private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.http.get("http://localhost:3000/products").subscribe(
      (data: any) => {
        this.products = data;
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }

  addToCart(product: any): void {
    const title = product.title;
    const subtitle = product.subtitle;
    const imageUrl = product.imageUrl;
    const price = product.price;

    if (title !== undefined && subtitle !== undefined && imageUrl !== undefined && price !== undefined) {
      const cartItem = {
        imageUrl: imageUrl,
        title: title,
        subtitle: subtitle,
        price: price,
      };

      this.cartService.addToCart(cartItem);
      alert("Added To Cart 😉😉");
      console.log('Product added to cart:', cartItem);
      
      // Update the badge value dynamically
      this.cartBadgeValue = this.cartService.getCartItemCount();
    } else {
      console.error('Invalid product format:', product);
    }
  }

  openDialog(product: any): void {
    const dialogRef = this.dialog.open(ProductDetailsComponent, {
      data: { productDetails: product } // Pass the details of a specific product to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
