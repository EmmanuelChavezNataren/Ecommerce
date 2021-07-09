/* eslint-disable @typescript-eslint/dot-notation */
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, timeout } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient,
  ) { }

  getDataProfile(): Observable<any> {
    const options = { headers: new HttpHeaders({ 'content-Type': 'application/json;' }) };
    return this.http.get(environment.apiUrl + environment.urlProfile, options).pipe(
      timeout(10000),
      map(resp => resp['data']),
      catchError(this.handleError));
  }

  getDataProducts(): Observable<any> {
    const options = { headers: new HttpHeaders({ 'content-Type': 'application/json;' }) };
    return this.http.get(environment.apiUrl + environment.urlProducts, options).pipe(
      timeout(10000),
      map(resp => resp['data']),
      catchError(this.handleError));
  }

  getDataCart(): Observable<any> {
    const options = { headers: new HttpHeaders({ 'content-Type': 'application/json;' }) };
    return this.http.get(environment.apiUrl + environment.urlCart, options).pipe(
      timeout(10000),
      map(resp => resp['data']),
      catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }

}
