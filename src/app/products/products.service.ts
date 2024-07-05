import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Product } from "../shared/models/Product";
import { PaginationData } from "../shared/models/PaginationData";
import { IPaginatedResponse } from "../shared/models/IPaginatedResponse.interface";
import {
  IBasicResponseData,
  IBasicResponseMessage,
} from "../shared/models/IBasicResponse.interfaces";
import { Review } from "../shared/models/Review";

export interface getProductsParams {
  orderColumn: string;
  orderType: string;
  searchText: string;
}

export type reviewInfo = {
  reviews: Review[];
  wasPurchased: boolean;
};

@Injectable({ providedIn: "root" })
export class ProductsService {
  onDeleteProductEvent = new Subject<void>();

  constructor(private http: HttpClient) {}

  getProducts(
    productsParams: getProductsParams,
    paginationData: PaginationData
  ): Observable<IPaginatedResponse<Product[]>> {
    let params = new HttpParams();
    params = params.append("searchText", productsParams.searchText);
    params = params.append("orderColumn", productsParams.orderColumn);
    params = params.append("orderType", productsParams.orderType);
    params = params.appendAll({ ...paginationData });

    return this.http.get<IPaginatedResponse<Product[]>>("products", { params });
  }

  getMyProducts(
    productsParams: getProductsParams,
    paginationData: PaginationData
  ): Observable<IPaginatedResponse<Product[]>> {
    let params = new HttpParams();
    params = params.append("searchText", productsParams.searchText);
    params = params.append("orderColumn", productsParams.orderColumn);
    params = params.append("orderType", productsParams.orderType);
    params = params.appendAll({ ...paginationData });

    return this.http.get<IPaginatedResponse<Product[]>>("products/my", {
      params,
    });
  }

  getProductById(id: number): Observable<IBasicResponseData<Product>> {
    return this.http.get<IBasicResponseData<Product>>(`products/${id}`);
  }

  getProductReviews(
    id: number,
    paginationData: PaginationData
  ): Observable<IPaginatedResponse<reviewInfo>> {
    return this.http.get<IPaginatedResponse<reviewInfo>>(
      `products/${id}/reviews`,
      { params: { ...paginationData } }
    );
  }

  insertProduct(product: Product): Observable<IBasicResponseMessage> {
    return this.http.post<IBasicResponseMessage>("products", product);
  }

  insertReview(id: number, review: Review): Observable<IBasicResponseMessage> {
    return this.http.post<IBasicResponseMessage>(
      `products/${id}/reviews`,
      review
    );
  }

  updateProduct(product: Product): Observable<IBasicResponseMessage> {
    return this.http.put<IBasicResponseMessage>("products", product);
  }

  updateReview(id: number, review: Review): Observable<IBasicResponseMessage> {
    return this.http.put<IBasicResponseMessage>(
      `products/${id}/reviews`,
      review
    );
  }

  deleteProduct(id: number): Observable<IBasicResponseMessage> {
    return this.http.delete<IBasicResponseMessage>(`products/${id}`);
  }
}
