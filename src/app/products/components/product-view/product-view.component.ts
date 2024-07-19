import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/shared/models/Product";
import { ProductsService } from "../../products.service";
import { ActivatedRoute, Router } from "@angular/router";
import {
  IBasicResponseData,
  IBasicResponseMessage,
} from "src/app/shared/models/IBasicResponse.interfaces";
import Swal from "sweetalert2";
import { UserService } from "src/app/shared/services/user.service";
import { User } from "src/app/shared/models/User";
import { ShoppingCartService } from "src/app/shared/services/shopping-cart.service";
import { Store } from "@ngrx/store";
import * as fromApp from "../../../store/app.reducer";
import * as ShoppingCartActions from "../../../shared/shopping-cart/store/shopping-cart.actions";

@Component({
  selector: "app-product-view",
  templateUrl: "./product-view.component.html",
  styleUrls: ["./product-view.component.scss"],
})
export class ProductViewComponent implements OnInit {
  loadingProductData: boolean = false;
  loadingSellerData: boolean = false;
  loadingLocationData: boolean = false;

  isShowingReviews: boolean = false;
  loadingReviews: boolean = false;

  product = new Product();
  seller = new User();

  constructor(
    private productsService: ProductsService,
    private userService: UserService,
    private shoppingCartService: ShoppingCartService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params["id"]) {
        this.getProductData(params["id"]);
      }
    });
  }

  getProductData(id: number) {
    this.loadingProductData = true;

    this.productsService.getProductById(id).subscribe({
      next: (res: IBasicResponseData<Product>) => {
        this.product.setProductData(res.data);
        this.loadingProductData = false;
        this.getSellerData(this.product.userId);
      },
      error: (err: Error) => {
        Swal.fire("Erro ao consultar produto!", err.message, "error");
        this.loadingProductData = false;
      },
    });
  }

  getSellerData(id: number) {
    this.userService.getUserData(id).subscribe({
      next: (res: IBasicResponseData<User>) => {
        this.seller.setUserData(res.data);
        this.loadingSellerData = false;
      },
      error: (err: Error) => {
        Swal.fire("Erro ao consultar vendedor!", err.message, "error");
        this.loadingSellerData = false;
      },
    });
  }

  addProductToShoppingCart() {
    this.store.dispatch(
      ShoppingCartActions.addProduct({ payload: this.product })
    );
    Swal.fire({
      title: "Confirmação",
      text: "Deseja realmente adicionar este produto ao carrinho?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        return this.shoppingCartService
          .addProductToShoppingCart(this.product.id)
          .subscribe({
            next: (res: IBasicResponseMessage) => {
              Swal.fire("Sucesso", res.message, "success");
              this.shoppingCartService.shoppingCartDataChanged.emit();
              this.router.navigate(["/products"]);
            },
            error: (err: Error) => {
              Swal.fire(
                "Erro ao adicionar produto ao carrinho!",
                err.message,
                "error"
              );
            },
          });
      },
    }).then((result) => {
      if (result.isDismissed) return;
    });
  }

  verifyIsLoading(): boolean {
    return (
      this.loadingLocationData ||
      this.loadingProductData ||
      this.loadingSellerData ||
      this.loadingReviews
    );
  }

  toggleReviews() {
    this.isShowingReviews = !this.isShowingReviews;
    if (this.isShowingReviews) this.loadingReviews = true;
  }

  goBack() {
    this.router.navigate(["/products"]);
  }
}
