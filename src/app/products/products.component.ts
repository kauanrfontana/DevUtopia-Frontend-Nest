import { Component, OnInit } from "@angular/core";
import { UserService } from "../shared/services/user.service";
import { Tab } from "../shared/models/Tab";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
  tabs: Tab[] = [];
  roleCategory: number = 0;

  constructor(private userService: UserService) {
    this.roleCategory = this.userService.userData().roleCategory;
  }

  ngOnInit(): void {
    this.tabs = [
      new Tab("/products", "Produtos", true),
      new Tab("/products/my", "Meus Produtos", this.roleCategory > 1),
    ];
  }
}
