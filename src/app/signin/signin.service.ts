 import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient,HttpEventType, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, VirtualTimeScheduler } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
const endpoint = 'http://localhost/softechschool/admin/services/';
const ext ='.php';
@Injectable({
  providedIn: 'root'
})

export class LoginService {
  sellersPermitString: any;
  constructor(private http: HttpClient) { }
  private extractData(res: Response): any {
    const body = res;
    return body || { };
  } 
  dt:any={};
  loginSF(data): Observable<any> {
    
    return this.http.post(endpoint + 'User_login'+ext,data).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  signupSf(data): Observable<any> {
   
    return this.http.post(endpoint + 'RegisterSchool'+ext,data).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }
  
  upload(data):Observable<any> {
    
    debugger
    this.dt.dImage=data;
    return this.http.post(endpoint + 'uploadSchoolLogo'+ext,this.dt).pipe(
      retry(2),
      catchError(this.handleError)
    );
    
  }
  //fork join for calling two observable methods


  // handle errors in services
private handleError(error: HttpErrorResponse): any {
  if (error.error instanceof ErrorEvent) {
    console.error('An error occurred:', error.error.message);
  } else {
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  return throwError(
    'Something bad happened; please try again later.');
}
}
