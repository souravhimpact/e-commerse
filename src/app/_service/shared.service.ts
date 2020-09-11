import { Injectable, Output } from '@angular/core';
import { Observable, Observer } from "rxjs";
import { Subject, BehaviorSubject } from 'rxjs';
import { map,  catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({providedIn:"root"})
export class SharedService {

    constructor(private http: HttpClient) { }
    

    get(url): Observable<any> {
        return this.http.get(url, {headers:this.getRequestOptions()})
        .pipe(map(this.extractData))
        .pipe(catchError(this.handleError));
    };

     /**
     * Get Request Options
     */
    getRequestOptions():HttpHeaders{
        var reqHeader = new HttpHeaders({ 'Authorization': 'bearer ' + localStorage.getItem("accessToken")})
       return reqHeader;
    };


    /**
    *    Post Request Options
    */

    postRequestOptions():HttpHeaders{
        const headers = new HttpHeaders({ 'Content-type': 'application/json', 'Authorization': 'bearer ' + localStorage.getItem("accessToken") });
        return headers;
    };

    postRequestGrandTypeOptions():HttpHeaders{
        const headers = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded'});
        return headers;
    };

    post(url, body): Observable<any> {
        return this.http.post(url, JSON.stringify(body), {headers:this.postRequestOptions()})
        .pipe(map(this.extractData), catchError(this.handleError));
    }; 

    post_grandtype(url, body): Observable<any> {
        return this.http.post(url, body, {headers:this.postRequestGrandTypeOptions()})
        .pipe(
            map(this.extractData), 
            retry(2),
            catchError(this.handleError));
    }; 


     /**
     * Extract data from reponse
     */
    private extractData(res: Response | any) {
        try {
            let body = res.json();
            return body.data || body || {};
        } catch (e) {
            return res;
        }

    }

     /**
     * Handle Error 
     */
    private handleError(error: Response | any) {
        //    console.log(error.status);
            if (error.status === 401) {
                console.log("Oops!!","Session Expired. Please login.");
                if (localStorage.getItem('accessToken') != null && localStorage.getItem("user") != null){
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('user');
                    localStorage.removeItem('sidebar');
                    localStorage.removeItem('subscriptionsettings');
                    window.location.reload();
                }else{
                    console.log("Oops!!","Session Expired. Please login.");
                //    this.toastr.warning("Session Expired. Please login.")
                    window.location.reload();
                }
            }
            try {
                return Observable.throw(error.json());
            } catch (e) {
                return Observable.throw(error);
            }
        }
    

}