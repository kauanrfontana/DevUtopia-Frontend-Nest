import { AuthService } from "src/app/auth/auth.service";
import { IBasicResponseData } from "../shared/models/IBasicResponse.interfaces";
import { UserService } from "./../shared/services/user.service";
import { Component, OnInit } from "@angular/core";
import { User } from "../shared/models/User";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.setUserData();
  }

  setUserData() {
    this.userService.getUserData(0).subscribe({
      next: (res: IBasicResponseData<User>) => {
        const userData = res.data;
        localStorage.setItem("userData", JSON.stringify(userData));
      },
      error: () => {
        this.authService.logout();
      },
    });
  }
}
