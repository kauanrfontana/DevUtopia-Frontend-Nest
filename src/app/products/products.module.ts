import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { ProductsComponent } from "./products.component";
import { ProductsRoutingModule } from "./products-routing.module";
import { ProductsListComponent } from "./components/products-list/products-list.component";
import { CardProductComponent } from "./components/card-product/card-product.component";
import { MatTabsModule } from "@angular/material/tabs";
import { ProductsFiltersComponent } from "./components/products-filters/products-filters.component";
import { ProductEditorComponent } from "./components/product-editor/product-editor.component";
import { MyProductsListComponent } from "./components/my-products-list/my-products-list.component";
import { ProductViewComponent } from "./components/product-view/product-view.component";
import { ProductReviewsComponent } from "./components/product-reviews/product-reviews.component";

@NgModule({
  declarations: [
    ProductsComponent,
    ProductsListComponent,
    CardProductComponent,
    ProductsFiltersComponent,
    ProductEditorComponent,
    MyProductsListComponent,
    ProductViewComponent,
    ProductReviewsComponent,
  ],
  imports: [SharedModule, ProductsRoutingModule, MatTabsModule],
  providers: [],
})
export class ProductsModule {}
