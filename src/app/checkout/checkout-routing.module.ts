import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CheckoutComponent } from "./checkout.component";

const Routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: CheckoutComponent,
  },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forChild(Routes)],
  exports: [RouterModule],
})
export class CheckoutRoutingModule {}
