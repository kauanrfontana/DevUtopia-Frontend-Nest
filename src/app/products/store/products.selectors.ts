import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "./products.reducer";

export const selectProduct = createFeatureSelector<State>("product");

export const selectProducts = createSelector(
  selectProduct,
  (product) => product.products
);

export const selectTotalProducts = createSelector(
  selectProduct,
  (product) => product.totalProducts
);

export const selectLoadingProducts = createSelector(
  selectProduct,
  (product) => product.loadingProducts
);

export const selectProductsSuccess = createSelector(
  selectProduct,
  (product) => product.message
);

export const selectProductsFailure = createSelector(
  selectProduct,
  (product) => product.error
);
