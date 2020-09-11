import { Component, OnInit } from '@angular/core';
import { UserService } from '../_service/user-service';

@Component({
  //selector: 'app-shopping-cart',
  templateUrl: 'notfound.component.html',
  styleUrls: ['notfound.component.scss'],
})
export class NotFoundComponent implements OnInit{


  constructor(private _userService: UserService) {
    
  }

  ngOnInit(){
    
  }




}
