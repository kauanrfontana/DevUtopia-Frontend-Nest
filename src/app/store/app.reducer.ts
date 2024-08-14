import { ActionReducerMap } from "@ngrx/store";
import * as fromShoppingCart from "../shared/shopping-cart/store/shopping-cart.reducer";
import * as fromProduct from "../products/store/products.reducer";
export interface AppState {
  shoppingCart: fromShoppingCart.State;
  product: fromProduct.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingCart: fromShoppingCart.shopingCartReducer,
  product: fromProduct.productsReducer,
};
