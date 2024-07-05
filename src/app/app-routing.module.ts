import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginGuard } from "./auth/components/login/login-guard.service";
import { AuthGuard } from "./shared/guards/auth-guard.service";

const routes: Routes = [
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
    canActivate: [LoginGuard],
  },
  {
    path: "home",
    loadChildren: () => import("./home/home.module").then((m) => m.HomeModule),
    canActivate: [AuthGuard],
  },
  {
    path: "profile",
    loadChildren: () =>
      import("./profile/profile.module").then((m) => m.ProfileModule),
    canActivate: [AuthGuard],
  },
  {
    path: "products",
    loadChildren: () =>
      import("./products/products.module").then((m) => m.ProductsModule),
    canActivate: [AuthGuard],
  },
  {
    path: "checkout",
    loadChildren: () =>
      import("./checkout/checkout.module").then((m) => m.CheckoutModule),
    canActivate: [AuthGuard],
  },
  { path: "**", redirectTo: "/auth" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
