import { Component } from '@angular/core';
import { ShoppingCartService } from './_service/shopping-cart.service';
import { Observable } from "rxjs/Observable";
import { ShoppingCartModal } from './model/shooping';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';

  public shoppingCartItems$: Observable<ShoppingCartModal[]>;
  private itemsInShoppingCart: ShoppingCartModal[] = [];

  total_price:any;
  constructor(private router: Router,private shoppingCartService: ShoppingCartService){
    this.shoppingCartItems$ = this.shoppingCartService.getItems();
    this.shoppingCartItems$.subscribe(_ => this.itemsInShoppingCart = _);

    this.shoppingCartService.getTotalPrice().subscribe(_ => this.total_price = _);
  }

  go_to_shopping(){
    this.router.navigate(["shoppingcart"]);
  }

}
