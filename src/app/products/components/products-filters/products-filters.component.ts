import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { ProductsService, getProductsParams } from "../../products.service";
import { PaginationData } from "src/app/shared/models/PaginationData";
import { Subscription } from "rxjs";

interface OrderIcon {
  iconType: number;
  value: string;
}

@Component({
  selector: "app-products-filters",
  templateUrl: "./products-filters.component.html",
  styleUrls: ["./products-filters.component.css"],
})
export class ProductsFiltersComponent implements OnInit, OnDestroy {
  priceOrder: OrderIcon = {
    iconType: 1,
    value: "DESC",
  };

  createdAtOrder: OrderIcon = {
    iconType: 1,
    value: "DESC",
  };

  DEFAULT_ORDER_TYPE: string = "DESC";
  NON_DEFAULT_ORDER_TYPE: string = "ASC";

  selectedOrderColumn: string = "createdAt";

  @Input() paginationData: PaginationData = new PaginationData();
  @Output() paginationDataChange: EventEmitter<PaginationData> =
    new EventEmitter<PaginationData>();

  @Input() canRegisterProduct: boolean = false;

  searchText: string = "";

  @Output() dispatchSearch: EventEmitter<{
    getProductsParams: getProductsParams;
    paginationData: PaginationData;
  }> = new EventEmitter<{
    getProductsParams: getProductsParams;
    paginationData: PaginationData;
  }>();

  deleteSubscription = new Subscription()

  constructor(private productsService: ProductsService ) {}

  ngOnInit() {
    this.dispatchSearchAction(this.productsParams, this.paginationData);
    this.deleteSubscription.add(
      this.productsService.onDeleteProductEvent.subscribe(() => {
        this.dispatchSearchAction(this.productsParams, this.paginationData);
      })
    );
  }

  get productsParams(): getProductsParams {
    return {
      orderColumn: this.selectedOrderColumn,
      orderType: this.selectedOrderType,
      searchText: this.searchText,
    };
  }

  get selectedOrderType(): string {
    return this.selectedOrderColumn == "price"
      ? this.priceOrder.value
      : this.createdAtOrder.value;
  }

  changeOrdenation(orderIcon: OrderIcon): void {
    if (orderIcon.value == this.DEFAULT_ORDER_TYPE) {
      orderIcon.value = this.NON_DEFAULT_ORDER_TYPE;
      orderIcon.iconType = 0;
    } else {
      orderIcon.value = this.DEFAULT_ORDER_TYPE;
      orderIcon.iconType = 1;
    }
  }

  selectOrderColumn(orderColumn: string) {
    this.selectedOrderColumn = orderColumn;
  }

  dispatchSearchAction(
    productsParams: getProductsParams,
    paginationData: PaginationData
  ) {
    this.dispatchSearch.emit({
      getProductsParams: productsParams,
      paginationData: paginationData,
    });
  }

  pageChanged(event: any) {
    this.paginationData = {
      ...this.paginationData,
      currentPage: event.pageIndex + 1,
      itemsPerPage: event.pageSize,
    };
    this.paginationDataChange.emit(this.paginationData);
    this.dispatchSearchAction(this.productsParams, this.paginationData);
  }

  ngOnDestroy() {
    this.deleteSubscription.unsubscribe();
  }
}
