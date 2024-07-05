import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import {
  IBasicResponseData,
  IBasicResponseMessage,
} from "../models/IBasicResponse.interfaces";
import { BehaviorSubject, Observable } from "rxjs";
import { ShoppingCart } from "../models/ShoppingCart";

@Injectable({ providedIn: "root" })
export class ShoppingCartService {
  shoppingCartData: BehaviorSubject<ShoppingCart> =
    new BehaviorSubject<ShoppingCart>(new ShoppingCart());
  shoppingCartDataChanged = new EventEmitter();
  constructor(private http: HttpClient) {}

  getShoppingCartData(): Observable<IBasicResponseData<ShoppingCart>> {
    return this.http.get<IBasicResponseData<ShoppingCart>>("shopping-cart");
  }

  addProductToShoppingCart(
    productId: number
  ): Observable<IBasicResponseMessage> {
    return this.http.post<IBasicResponseMessage>("shoppingCart", { productId });
  }

  removeProductFromShoppingCart(
    productId: number
  ): Observable<IBasicResponseMessage> {
    return this.http.delete<IBasicResponseMessage>("shoppingCart/" + productId);
  }
}
