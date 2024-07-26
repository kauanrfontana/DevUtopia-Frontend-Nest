import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "./shopping-cart.reducer";

export const selectShoppingCartState =
  createFeatureSelector<State>("shoppingCart");

export const selectQtdProducts = createSelector(
  selectShoppingCartState,
  (shoppingCart) => shoppingCart.qtdProducts
);

export const selectTotalPrice = createSelector(
  selectShoppingCartState,
  (shoppingCart) => shoppingCart.totalPrice
);

export const selectProducts = createSelector(
  selectShoppingCartState,
  (shoppingCart) => shoppingCart.products
);

export const selectProductSuccess = createSelector(
  selectShoppingCartState,
  (shoppingCart) => shoppingCart.message
);

export const selectProductFailure = createSelector(
  selectShoppingCartState,
  (shoppingCart) => shoppingCart.error
);
