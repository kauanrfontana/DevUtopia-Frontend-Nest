import { Component, OnDestroy, OnInit } from "@angular/core";
import { AppService } from "./app.service";
import { Subscription } from "rxjs";
import { NavigationEnd, Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
  verifyMenuSubjectSubscription?: Subscription;
  showMenus: boolean = false;
  loading: boolean = true;
  routerEventsSubscription?: Subscription;

  constructor(private appService: AppService, private router: Router) {}

  ngOnInit(): void {
    this.routerEventsSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showMenus = window.location.pathname !== "/auth";
      }
    });
    this.verifyMenuSubjectSubscription =
      this.appService.verifyMenuSubject.subscribe({
        next: (showMenu: boolean) => {
          this.showMenus = showMenu;
        },
      });
  }

  ngOnDestroy(): void {
    this.verifyMenuSubjectSubscription?.unsubscribe();
    this.routerEventsSubscription?.unsubscribe();
  }
}
