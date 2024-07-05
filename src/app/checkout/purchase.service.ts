import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Product } from "../shared/models/Product";
import { HttpClient } from "@angular/common/http";
import { IBasicResponseMessage } from "../shared/models/IBasicResponse.interfaces";

@Injectable({
  providedIn: "root",
})
export class PurchaseService {
  constructor(private http: HttpClient) {}

  insertPurchase(products: Product[]): Observable<IBasicResponseMessage> {
    return this.http.post<IBasicResponseMessage>("purchase", { products });
  }
}
