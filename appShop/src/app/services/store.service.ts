import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, lastValueFrom } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  baseUrl: string = 'https://api.escuelajs.co/api/v1/';

  //lista carrito
  private myList: Product[] = [];

  //carrito observable
  private myCart = new BehaviorSubject<Product[]>([]);
  myCart$ = this.myCart.asObservable();

  constructor(private httpClient: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    const response = this.httpClient.get<Product[]>(`${this.baseUrl}products`);
    // console.log(response);
    return response
  }
  //con promesa
  // getPromise(): Promise<any[]> {
  //   return lastValueFrom(this.httpClient.get<any[]>(`${this.baseUrl}products`))
  // }
  addProduct(product: Product) {
    this.myList.push(product)
    //emito la lista para los que estén escuchando
    this.myCart.next(this.myList);
  }
}
