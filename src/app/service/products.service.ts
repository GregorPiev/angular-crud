import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/Product';
import { Observable, pipe, from, of } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { prodList } from './demoData.js';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  url = 'http://localhost:4000/products';
  constructor(private http: HttpClient) { }
  productList = prodList;

  private handleError<T>(operation = 'operation') {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(operation, error); // log to console instead
      const err = (error && error.error && error.error.resultCode) || error;
      throw (err);
      // Let the app keep running by returning an empty result.
      // return of(result as T);
    };
  }

  addProduct(val: Product): Observable<any> {
    this.productList.push(val);
    return of(this.productList)
      .pipe(
        catchError(this.handleError<any>('addProduct'))
      );
  }

  getProductList(): Observable<any> {
    return of(this.productList).pipe(
      catchError(this.handleError<any>('getProductList'))
    ).pipe(
      catchError(this.handleError<any>('getProductList'))
    );
  }

  getProduct(itemId: number): Observable<any> {
    return of(
      this.productList.filter(obj => {
        return obj.id === Number(itemId);
      })
    ).pipe(
      catchError(this.handleError<any>('getProduct'))
    );
  }

  updateProduct(product: any): Observable<any> {
      this.productList.forEach((item, index) => {
        if (item.id === Number(product.id)) {
          prodList[index] = product;
        }
      });
      return of(this.productList).pipe(
        catchError(this.handleError<any>('updateProduct'))
      );
  }

  deleteProduct(item: any): Observable<any> {
    const index = this.productList.indexOf(item);
    this.productList.splice(index, 1);
    return of(this.productList).pipe(
      catchError(this.handleError<any>('deleteProduct'))
    );
  }
}
