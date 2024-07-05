import { Component, ElementRef, HostListener, ViewChild } from "@angular/core";
import { AppService } from "src/app/app.service";
import { AuthService } from "src/app/auth/auth.service";

interface INavItem {
  icon: string;
  route: string;
  label: string;
}

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent {
  showingNavbar: boolean = true;

  navItems: INavItem[] = [
    {
      icon: "person",
      route: "/profile",
      label: "Perfil",
    },
    {
      icon: "home",
      route: "/home",
      label: "Home",
    },
    {
      icon: "shopping_basket",
      route: "/products",
      label: "Produtos",
    },
  ];

  validateShowingNavbar = true;

  @ViewChild("navContainer") navContainer?: ElementRef;
  firstView: boolean = true;

  iconOpened: string = "keyboard_arrow_down";

  constructor(
    private authService: AuthService,
    private appService: AppService
  ) {}

  @HostListener("mouseenter") mouseover() {
    if (this.validateShowingNavbar) {
      this.showingNavbar = true;
    }
    this.firstView = false;
  }
  @HostListener("mouseleave") mouseleave() {
    if (this.validateShowingNavbar) {
      this.showingNavbar = false;
    }
  }

  onLogout() {
    this.showingNavbar = false;
    this.appService.verifyMenuSubject.next(false);
    this.authService.logout();
  }

  navbarOpened() {
    if (this.navContainer?.nativeElement.classList.contains("opened")) {
      this.navContainer?.nativeElement.classList.remove("opened");
      this.iconOpened = "keyboard_arrow_down";
      this.validateShowingNavbar = true;
      return;
    }
    this.navContainer?.nativeElement.classList.add("opened");
    this.iconOpened = "keyboard_arrow_up";

    this.validateShowingNavbar = false;
  }
}
