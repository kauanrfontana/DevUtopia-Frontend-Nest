import { ActionReducerMap } from "@ngrx/store";
import * as fromShoppingCart from "../shared/shopping-cart/store/shopping-cart.reducer";
export interface AppState {
  shoppingCart: fromShoppingCart.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingCart: fromShoppingCart.shopingCartReducer,
};
