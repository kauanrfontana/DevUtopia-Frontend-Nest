import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductsComponent } from "./products.component";
import { ProductsListComponent } from "./components/products-list/products-list.component";
import { MyProductsListComponent } from "./components/my-products-list/my-products-list.component";
import { ProductEditorComponent } from "./components/product-editor/product-editor.component";
import { ProductViewComponent } from "./components/product-view/product-view.component";

const routes: Routes = [
  {
    path: "",
    component: ProductsComponent,

    children: [
      { path: "", component: ProductsListComponent },
      {
        path: "my",
        component: MyProductsListComponent,
      },
    ],
  },
  { path: "view/:id", component: ProductViewComponent },
  { path: "edit/:id", component: ProductEditorComponent },
  { path: "create", component: ProductEditorComponent },
  { path: "**", redirectTo: "" },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
