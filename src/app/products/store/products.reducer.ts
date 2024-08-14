import { createReducer, on } from "@ngrx/store";
import { Product } from "src/app/shared/models/Product";
import * as ProductActions from "./products.actions";

export interface State {
  products: Product[];
  totalProducts: number;
  loadingProducts: boolean;
  mineProducts: Product[];
  totalMineProducts: number;
  loadingMineProducts: boolean;
  error: string | null;
  message: string | null;
}

export const initialState: State = {
  products: [],
  totalProducts: 0,
  loadingProducts: true,
  mineProducts: [],
  totalMineProducts: 0,
  loadingMineProducts: true,
  error: null,
  message: null,
};

export const productsReducer = createReducer(
  initialState,
  on(ProductActions.loadProducts, (state) => ({
    ...state,
    loadingProducts: true,
  })),
  on(ProductActions.loadProductsSuccess, (state, { products, totalItems }) => ({
    ...state,
    products: products,
    totalProducts: totalItems,
    loadingProducts: false,
  })),
  on(ProductActions.loadProductsFailure, (state, { payload }) => ({
    ...state,
    error: payload,
    loadingProducts: false,
  }))
);
