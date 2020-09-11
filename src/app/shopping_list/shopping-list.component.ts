import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ShoppingCartModal } from '../model/shooping';
import { ShoppingCartService } from '../_service/shopping-cart.service';
import { Router } from '@angular/router';

@Component({
  //selector: 'app-shopping-cart',
  templateUrl: 'shopping-list.component.html',
  styleUrls: ['shopping-list.component.scss'],
})
export class ShoppingCartComponent implements OnInit{

  public shoppingCartItems$: Observable<ShoppingCartModal[]>;
  private itemsInShoppingCart: ShoppingCartModal[] = [];

  total_price:any;
  constructor(private router: Router,private shoppingCartService: ShoppingCartService){
    this.shoppingCartItems$ = this.shoppingCartService.getItems();
    this.shoppingCartItems$.subscribe(_ => this.itemsInShoppingCart = _);

    this.shoppingCartService.getTotalPrice().subscribe(_ => this.total_price = _);
  }

  ngOnInit(){
    
  }

  item_remove(data){
    this.shoppingCartService.removeFromShoppingCart(data);
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  
  decreased(data){
    if(parseInt(data.quantity) <= 1){
      return;
    }
    data.quantity = (parseInt(data.quantity) - 1)
    this.shoppingCartService.addToShoppingCart(data);
  }

  increment(data){
    data.quantity = (parseInt(data.quantity) + 1);
    this.shoppingCartService.addToShoppingCart(data);
  }

  add_product(){
    this.router.navigate(["../productlist"])
  }

}
