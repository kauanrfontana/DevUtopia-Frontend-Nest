import { createReducer, on } from "@ngrx/store";
import { Product } from "../../models/Product";
import * as ShoppingCartActions from "./shopping-cart.actions";

export interface State {
  userId: number;
  products: Product[];
  qtdProducts: number;
  totalPrice: number;
  error: string | null;
  message: string | null;
}

export const initialState: State = {
  userId: 0,
  products: [],
  qtdProducts: 0,
  totalPrice: 0,
  error: null,
  message: null,
};

export const shopingCartReducer = createReducer(
  initialState,
  on(ShoppingCartActions.loadShoppingCartSuccess, (state, { payload }) => ({
    ...state,
    ...payload,
  })),
  on(ShoppingCartActions.addProductSuccess, (state, { payload, message }) => ({
    ...state,
    products: [...state.products, payload],
    qtdProducts: state.qtdProducts + 1,
    totalPrice: state.totalPrice + payload.price,
    message,
    error: null,
  })),
  on(ShoppingCartActions.addProductFailure, (state, { payload }) => ({
    ...state,
    error: payload,
  })),
  on(
    ShoppingCartActions.deleteProductSuccess,
    (state, { payload, message }) => {
      let productPrice = 0;
      const products = state.products.filter((product) => {
        if (product.id === payload) productPrice = product.price;
        return product.id !== payload;
      });
      return {
        ...state,
        products: products,
        qtdProducts: state.qtdProducts - 1,
        totalPrice: state.totalPrice - productPrice,
        message,
        error: null,
      };
    }
  ),
  on(ShoppingCartActions.deleteProductFailure, (state, { payload }) => ({
    ...state,
    error: payload,
  }))
);
