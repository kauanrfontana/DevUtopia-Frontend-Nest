import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductsService } from "../products.service";
import { catchError, map, of, switchMap } from "rxjs";
import * as ProductActions from "./products.actions";
import { Product } from "src/app/shared/models/Product";
import { IPaginatedResponse } from "src/app/shared/models/IPaginatedResponse.interface";
import { Injectable } from "@angular/core";

@Injectable()
export class ProductsReducerEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      switchMap((action) =>
        this.productsService
          .getProducts(action.productsParams, action.paginationData)
          .pipe(
            map((res: IPaginatedResponse<Product[]>) => {
              return ProductActions.loadProductsSuccess({
                products: res.data,
                totalItems: res.totalItems,
              });
            }),
            catchError((err) =>
              of(
                ProductActions.loadProductsFailure({
                  payload: err.message,
                })
              )
            )
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productsService: ProductsService
  ) {}
}
