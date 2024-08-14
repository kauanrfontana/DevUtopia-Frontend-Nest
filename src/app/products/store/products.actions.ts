import { getProductsParams } from "../products.service";
import { createAction, props } from "@ngrx/store";
import { PaginationData } from "src/app/shared/models/PaginationData";
import { Product } from "src/app/shared/models/Product";

export const loadProducts = createAction(
  "[Products] Load Products",
  props<{ productsParams: getProductsParams; paginationData: PaginationData }>()
);

export const loadProductsSuccess = createAction(
  "[Products] Load Products Success",
  props<{ products: Product[]; totalItems: number }>()
);

export const loadProductsFailure = createAction(
  "[Products] Load Products Failure",
  props<{ payload: string }>()
);
