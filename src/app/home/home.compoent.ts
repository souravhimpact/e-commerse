import { Component, OnInit } from '@angular/core';
import { UserService } from '../_service/user-service';
import { ShoppingCartService } from '../_service/shopping-cart.service';

@Component({
  //selector: 'app-home',
  templateUrl: 'home.compoent.html',
  styleUrls: ['home.compoent.scss'],
})
export class HomeComponent implements OnInit{

  product_list:any=[];

  constructor(private _userService: UserService,private shoppingCartService: ShoppingCartService) {
    
  }

  ngOnInit(){
    this.getUser_list();
  }

  getUser_list(){
    this._userService.product_list()
    .subscribe((res: any) => {
        this.product_list = res["data"];  
      }, (error) => {
       console.log(error)
    });
  }


  add_to_cart(data){
    this.shoppingCartService.addToShoppingCart(data)
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
    data.quantity = (parseInt(data.quantity) - 1);
  }

  increment(data){
    data.quantity = (parseInt(data.quantity) + 1);
  }
}
