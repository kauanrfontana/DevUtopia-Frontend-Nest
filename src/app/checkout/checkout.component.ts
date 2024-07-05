import { PurchaseService } from "./purchase.service";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ShoppingCart } from "../shared/models/ShoppingCart";
import Swal from "sweetalert2";
import { IBasicResponseMessage } from "../shared/models/IBasicResponse.interfaces";
import { ShoppingCartService } from "../shared/services/shopping-cart.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  shoppingCartData = new ShoppingCart();
  subscriptionShoppingCartData = new Subscription();

  constructor(
    private shoppingCartService: ShoppingCartService,
    private purchaseService: PurchaseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscriptionShoppingCartData =
      this.shoppingCartService.shoppingCartData.subscribe((data) => {
        this.shoppingCartData = data;
      });
  }

  onPayment() {
    Swal.fire({
      title: "Confirmação",
      text: "Deseja realmente realizar a compra?",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Confirmar",
      preConfirm: () => {
        return this.purchaseService
          .insertPurchase(this.shoppingCartData.products)
          .subscribe({
            next: (res: IBasicResponseMessage) => {
              Swal.fire({
                title: "Sucesso",
                text: res.message,
                icon: "success",
              }).then((result) => {
                if (result.dismiss) return;
                this.shoppingCartService.shoppingCartDataChanged.emit();
                this.router.navigate(["/"]);
              });
            },
            error: (err: Error) => {
              Swal.fire("Erro", err.message, "error");
            },
          });
      },
    });
  }

  ngOnDestroy() {
    this.subscriptionShoppingCartData.unsubscribe();
  }
}
