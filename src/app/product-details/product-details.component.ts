import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  productDetails: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.productDetails = data.productDetails;
  }
}
