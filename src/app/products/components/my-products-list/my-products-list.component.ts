import { Component } from "@angular/core";
import { ProductsService, getProductsParams } from "../../products.service";
import { PaginationData } from "src/app/shared/models/PaginationData";
import { Product } from "src/app/shared/models/Product";
import { IPaginatedResponse } from "src/app/shared/models/IPaginatedResponse.interface";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Component({
  selector: "app-products-list",
  templateUrl: "./my-products-list.component.html",
  styleUrls: ["./my-products-list.component.scss"],
})
export class MyProductsListComponent {
  productsList: Product[] = [];

  loadingProducts: boolean = true;

  paginationData = new PaginationData();

  constructor(private productService: ProductsService, private router: Router) {}

  getProductsPaginated(
    productsParams: getProductsParams,
    paginationData: PaginationData,
    
  ) {
    this.loadingProducts = true;

    this.productService.getMyProducts(productsParams, paginationData).subscribe({
      next: (res: IPaginatedResponse<Product[]>) => {
        this.productsList = res.data;
        this.paginationData = {
          ...this.paginationData,
          totalItems: res.totalItems,
        };
        this.loadingProducts = false;
      },
      error: (err: Error) => {
        Swal.fire("Erro ao buscar produtos!", err.message, "error").then(() => {
          this.loadingProducts = false;
        });
      },
    });
  }

  viewProduct(product: Product) {
    this.router.navigate(['/products/view/' + product.id]);
  }
}
