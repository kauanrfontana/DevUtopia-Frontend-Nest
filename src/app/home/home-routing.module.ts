import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home.component";

const Routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: HomeComponent,
  },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forChild(Routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
