import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { NgModule } from "@angular/core";

const Routes: Routes = [
  { path: "", component: LoginComponent, pathMatch: "full" },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forChild(Routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
