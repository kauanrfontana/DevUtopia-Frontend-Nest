import { Router } from "@angular/router";
import { UserService } from "./../../../shared/services/user.service";
import { getProductsParams } from "./../../products.service";
import { Component, OnInit } from "@angular/core";
import { PaginationData } from "src/app/shared/models/PaginationData";
import { Product } from "src/app/shared/models/Product";
import Swal from "sweetalert2";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import * as fromApp from "../../../store/app.reducer";
import * as ProductsSelectors from "../../store/products.selectors";
import * as ProductsActions from "../../store/products.actions";
@Component({
  selector: "app-products-list",
  templateUrl: "./products-list.component.html",
  styleUrls: ["./products-list.component.scss"],
})
export class ProductsListComponent implements OnInit {
  productsList$: Observable<Product[]> = this.store.select(
    ProductsSelectors.selectProducts
  );

  isAdmin: boolean = false;

  loadingProducts$: Observable<boolean> = this.store.select(
    ProductsSelectors.selectLoadingProducts
  );

  productsSuccesses$: Observable<string | null> = this.store.select(
    ProductsSelectors.selectProductsSuccess
  );

  productsFailures$: Observable<string | null> = this.store.select(
    ProductsSelectors.selectProductsFailure
  );

  paginationData = new PaginationData();

  constructor(
    private userService: UserService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {
    this.isAdmin = this.userService.isAdmin();
  }

  ngOnInit(): void {
    this.store.select(ProductsSelectors.selectTotalProducts).subscribe({
      next: (totalItems: number) => {
        this.paginationData = {
          ...this.paginationData,
          totalItems,
        };
      },
    });
    this.productsFailures$.subscribe({
      next: (error: string | null) => {
        if (error) {
          Swal.fire("Erro ao buscar produtos!", error, "error");
        }
      },
    });
  }

  getProductsPaginated(
    productsParams: getProductsParams,
    paginationData: PaginationData
  ) {
    this.store.dispatch(
      ProductsActions.loadProducts({ productsParams, paginationData })
    );
  }

  viewProduct(product: Product) {
    this.router.navigate(["/products/view/" + product.id]);
  }
}
