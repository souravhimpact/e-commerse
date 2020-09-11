import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { ShoppingCartModal } from '../model/shooping';



// import {PhysicalCardsModal} from '../_model/physicalcardsdetails'

export const ANONYMOUS_SHOPPING_CART : ShoppingCartModal = {
  id:undefined,
}

@Injectable({providedIn:"root"})
export class ShoppingCartService {

  private itemsInShoppingCartSubject: BehaviorSubject<ShoppingCartModal[]> = new BehaviorSubject([]);
  private itemsInShoppingCart: ShoppingCartModal[] = [];

  constructor() {
    this.itemsInShoppingCartSubject.subscribe(_ => {
      this.itemsInShoppingCart = _;
    });
  }

  public addToShoppingCart(item: ShoppingCartModal) {
    const ifexiting = this.itemsInShoppingCart.filter(phyObj => phyObj.id ==  item.id)
    if(ifexiting!=null && ifexiting.length>0){

       const currentItems = [...this.itemsInShoppingCart];
       currentItems.map(a =>{
         if(a.id == item.id){
           a.quantity = item.quantity;
         }
       })
      // const itemsWithoutRemoved = currentItems.filter(_ => _.id !== item.id);
       this.itemsInShoppingCartSubject.next(currentItems);

    }else{
      this.itemsInShoppingCartSubject.next([...this.itemsInShoppingCart, item]);
    }
  }

  public removeFromShoppingCart(item: ShoppingCartModal) {
    const currentItems = [...this.itemsInShoppingCart];
    const itemsWithoutRemoved = currentItems.filter(_ => _.id !== item.id);
    this.itemsInShoppingCartSubject.next(itemsWithoutRemoved);
  }


  public setToShoppingCart(item: ShoppingCartModal[]) {
    if(item!=null && item.length>0){
      this.itemsInShoppingCartSubject.next([...item]);
    }else{
      this.itemsInShoppingCartSubject.next(null);
    }
  }

  public getItems(): Observable<ShoppingCartModal[]> {
    return this.itemsInShoppingCartSubject.map((items: ShoppingCartModal[]) => {
      return items;
    });
  }


  public getTotalCount(): Observable<number> {
    return this.itemsInShoppingCartSubject.map((items: ShoppingCartModal[]) => {
      return this.itemsInShoppingCart.length;
    });
  }

  public getTotalPrice(): Observable<number> {
    return this.itemsInShoppingCartSubject.map((items: ShoppingCartModal[]) => {
      return items.reduce((prev, curr: ShoppingCartModal) => {
        return prev + (parseFloat(curr.price) * (curr.quantity!=null?curr.quantity:1));
      }, 0);
    });
  }


  public getThisItemIsAvailable(item: ShoppingCartModal):Observable<boolean> {
    return this.itemsInShoppingCartSubject.map((items: ShoppingCartModal[]) => {
      return items.find(_ => _.id === item.id) != null;;
    });
  }

  
}
