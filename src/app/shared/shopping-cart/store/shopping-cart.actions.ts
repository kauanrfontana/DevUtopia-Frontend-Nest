import { createAction, props } from "@ngrx/store";
import { Product } from "../../models/Product";
import { State } from "./shopping-cart.reducer";

export const loadShoppingCart = createAction(
  "[Shopping Cart] Load Shopping Cart"
);

export const loadShoppingCartSuccess = createAction(
  "[Shopping Cart] Load Shopping Cart Success",
  props<{ payload: State }>()
);

export const loadShoppingCartFailure = createAction(
  "[Shopping Cart] Load Shopping Cart Failure",
  props<{ payload: Error }>()
);

export const addProduct = createAction(
  "[Shopping Cart] Add Product",
  props<{ payload: Product }>()
);

export const addProductSuccess = createAction(
  "[Shopping Cart] Add Product Success",
  props<{ payload: Product; message: string }>()
);

export const addProductFailure = createAction(
  "[Shopping Cart] Add Product Failure",
  props<{ payload: string }>()
);

export const deleteProduct = createAction(
  "[Shopping Cart] Delete Product",
  props<{ payload: number }>()
);

export const deleteProductSuccess = createAction(
  "[Shopping Cart] Delete Product Success",
  props<{ payload: number; message: string }>()
);

export const deleteProductFailure = createAction(
  "[Shopping Cart] Delete Product Failure",
  props<{ payload: string }>()
);
