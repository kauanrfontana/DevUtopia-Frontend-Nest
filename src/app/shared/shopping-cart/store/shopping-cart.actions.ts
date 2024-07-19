import { createAction, props } from "@ngrx/store";
import { Product } from "../../models/Product";
import { State } from "./shopping-cart.reducer";

export const fetchShoppingCart = createAction(
  "[Shopping Cart] Fetch Shopping Cart"
);

export const setShoppingCart = createAction(
  "[Shopping Cart] Set Shopping Cart",
  props<{ payload: State }>()
);

export const addProduct = createAction(
  "[Shopping Cart] Add Product",
  props<{ payload: Product }>()
);
