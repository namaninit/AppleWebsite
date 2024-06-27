import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CartsComponent } from './carts/carts.component';

const routes: Routes = [
  {
    path:'',component:ProductsComponent
  },
  {
    path:'cart', component:CartsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
