import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import * as ShoppingCartActions from "./store/shopping-cart.actions";
import * as ShoppingCartSelectors from "./store/shopping-cart.selectors";

@Component({
  selector: "app-shopping-cart",
  templateUrl: "./shopping-cart.component.html",
  styleUrls: ["./shopping-cart.component.scss"],
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  @ViewChild("iconSection") iconSection?: ElementRef;
  cluePosition: "left" | "right" = "right";
  dropdownShowing: boolean = false;

  qtdProducts$ = this.store.select(ShoppingCartSelectors.selectQtdProducts);
  totalPrice$ = this.store.select(ShoppingCartSelectors.selectTotalPrice);
  products$ = this.store.select(ShoppingCartSelectors.selectProducts);

  shoppingCartFailures$ = this.store.select(
    ShoppingCartSelectors.selectProductFailure
  );
  shoppingCartSuccesses$ = this.store.select(
    ShoppingCartSelectors.selectProductSuccess
  );

  subscription = new Subscription();

  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {
    if (window.innerWidth < 980) {
      this.cluePosition = "left";
    }
  }

  @HostListener("document:click", ["$event.target"])
  public onClick(targetElement: HTMLElement): void {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      if (this.dropdownShowing) {
        this.doAnimation();
        this.dropdownShowing = false;
      }
    }
  }

  @HostListener("window:resize", ["$event"])
  onResize() {
    if (window.innerWidth < 980) {
      this.cluePosition = "left";
    } else {
      this.cluePosition = "right";
    }
  }

  ngOnInit(): void {
    this.getShoppingCartData();
    this.shoppingCartFailures$.subscribe({
      next: (error: string | null) => {
        if (error) {
          Swal.fire("Erro ao consultar carrinho!", error, "error");
        }
      },
    });
    this.shoppingCartSuccesses$.subscribe({
      next: (message: string | null) => {
        if (message) {
          Swal.fire("Sucesso!", message, "success");
        }
      },
    });
  }

  doAnimation() {
    this.iconSection?.nativeElement.classList.add(
      "animate",
      "shake",
      "animate--fast"
    );

    setTimeout(() => {
      this.iconSection?.nativeElement.classList.remove(
        "animate",
        "shake",
        "animate--fast"
      );
    }, 500);
  }

  onOpenDropdown() {
    this.doAnimation();
    this.dropdownShowing = !this.dropdownShowing;
  }

  getShoppingCartData() {
    this.store.dispatch(ShoppingCartActions.loadShoppingCart());
  }

  onRemoveProduct(productId: number) {
    this.store.dispatch(
      ShoppingCartActions.deleteProduct({ payload: productId })
    );
    /*  this.shoppingCartService
      .removeProductFromShoppingCart(productId)
      .subscribe({
        next: (res) => {
          Swal.fire("Sucesso", res.message, "success").then(() => {
            this.shoppingCartService.shoppingCartDataChanged.emit();
            this.getShoppingCartData();
          });
        },
        error: (err: Error) => {
          Swal.fire("Erro ao remover produto!", err.message, "error");
        },
      }); */
  }

  onCheckout() {
    this.router.navigate(["/checkout"]);
    this.dropdownShowing = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
