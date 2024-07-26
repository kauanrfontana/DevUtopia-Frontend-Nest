import { Injectable } from "@angular/core";
import { ShoppingCartService } from "../../services/shopping-cart.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as ShoppingCartActions from "./shopping-cart.actions";
import { catchError, map, of, switchMap, tap } from "rxjs";
import {
  IBasicResponseData,
  IBasicResponseMessage,
} from "../../models/IBasicResponse.interfaces";
import { ShoppingCart } from "../../models/ShoppingCart";
import { Router } from "@angular/router";

@Injectable()
export class ShoppingCartEffects {
  loadShoppingCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShoppingCartActions.loadShoppingCart),
      switchMap(() =>
        this.shoppingCartService.getShoppingCartData().pipe(
          map((res: IBasicResponseData<ShoppingCart>) => {
            return ShoppingCartActions.loadShoppingCartSuccess({
              payload: { ...res.data, error: null, message: null },
            });
          }),
          catchError((err) =>
            of(ShoppingCartActions.loadShoppingCartFailure(err))
          )
        )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShoppingCartActions.deleteProduct),
      switchMap((action) =>
        this.shoppingCartService
          .removeProductFromShoppingCart(action.payload)
          .pipe(
            map((response: IBasicResponseMessage) =>
              ShoppingCartActions.deleteProductSuccess({
                payload: action.payload,
                message: response.message,
              })
            ),
            catchError((err) =>
              of(
                ShoppingCartActions.deleteProductFailure({
                  payload: err.message,
                })
              )
            )
          )
      )
    )
  );

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShoppingCartActions.addProduct),
      switchMap((action) =>
        this.shoppingCartService
          .addProductToShoppingCart(action.payload.id)
          .pipe(
            tap(() => this.router.navigate(["/products"])),
            map((response: IBasicResponseMessage) =>
              ShoppingCartActions.addProductSuccess({
                payload: action.payload,
                message: response.message,
              })
            ),
            catchError((err) => {
              return of(
                ShoppingCartActions.addProductFailure({ payload: err.message })
              );
            })
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private shoppingCartService: ShoppingCartService,
    private router: Router
  ) {}
}
