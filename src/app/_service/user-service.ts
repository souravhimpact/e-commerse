import { Injectable } from '@angular/core';

import { SharedService } from './shared.service';
import { map} from 'rxjs/operators';


@Injectable({providedIn:"root"})
export class UserService {
    environment:any;
    constructor( private _sharedService: SharedService) {
        this.environment = "https://www.mocky.io";
    }

    product_list(){
      const registerURL = this.environment + "/v2/5eda4003330000740079ea60";
      return this._sharedService.get(registerURL)
      .pipe(map(response => {
          return response;
      }))
    }

    getLoggedInUserDetails(userId){
      const registerURL = this.environment + "/api/users/"+userId;
      return this._sharedService.get(registerURL)
      .pipe(map(response => {
          return response;
      }))
    };

   
}