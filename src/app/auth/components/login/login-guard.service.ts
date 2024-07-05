import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class LoginGuard {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!localStorage.getItem("token")) {
      return true;
    }

    this.router.navigate(["/home"]);
    return false;
  }
}
