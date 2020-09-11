import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShoppingCartComponent } from './shopping-list.component';
import { ShoppingCartRoutingModule } from './shopping-list-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ShoppingCartRoutingModule
  ],
  declarations: [ShoppingCartComponent],
})
export class ShoopingListModule {}
