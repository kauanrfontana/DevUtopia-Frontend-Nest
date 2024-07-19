import { createReducer, on } from "@ngrx/store";
import { Product } from "../../models/Product";
import * as ShoppingCartActions from "./shopping-cart.actions";

export interface State {
  userId: number;
  products: Product[];
  qtdProducts: number;
  totalPrice: number;
}

export const initialState: State = {
  userId: 0,
  products: [],
  qtdProducts: 0,
  totalPrice: 0,
};

export const shopingCartReducer = createReducer(
  initialState,
  on(ShoppingCartActions.addProduct, (state, { payload }) => ({
    ...state,
    products: [...state.products, payload],
  })),
  on(
    ShoppingCartActions.setShoppingCart,
    (state, { payload }) => payload ?? state
  )
);
