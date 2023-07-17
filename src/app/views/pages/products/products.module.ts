import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ListProductsComponent } from './list-products/list-products.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { FilterByProductPipe } from 'src/app/helpers/filterByProduct';


@NgModule({
  declarations: [
    ListProductsComponent,
    AddProductsComponent,
    EditProductComponent,
    FilterByProductPipe
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
