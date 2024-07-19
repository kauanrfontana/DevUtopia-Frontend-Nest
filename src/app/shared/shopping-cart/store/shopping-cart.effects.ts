import { Injectable } from "@angular/core";
import { ShoppingCartService } from "../../services/shopping-cart.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as ShoppingCartActions from "./shopping-cart.actions";
import { map, switchMap } from "rxjs";
import { IBasicResponseData } from "../../models/IBasicResponse.interfaces";
import { ShoppingCart } from "../../models/ShoppingCart";

@Injectable()
export class ShoppingCartEffects {
  fecthShoppingCartData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShoppingCartActions.fetchShoppingCart),
      switchMap(() => this.shoppingCartService.getShoppingCartData()),
      map((res: IBasicResponseData<ShoppingCart>) => {
        return ShoppingCartActions.setShoppingCart({ payload: res.data });
      })
    )
  );

  constructor(
    private actions$: Actions,
    private shoppingCartService: ShoppingCartService
  ) {}
}
