import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { CartComponent } from './pages/cart/cart.component';
import { MatIcon } from '@angular/material/icon';
import { SharedModule } from "../../shared/shared.module";



@NgModule({
  declarations: [
    CatalogComponent,
    CartComponent,

  ],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    MatIcon,
    SharedModule
]
})
export class CatalogModule { }
