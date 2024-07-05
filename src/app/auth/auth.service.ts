import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { Router } from "@angular/router";
import { IBasicResponseMessage } from "../shared/models/IBasicResponse.interfaces";

interface IAuthResponse {
  token: string;
  refreshToken: string;
}
@Injectable({ providedIn: "root" })
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: {
    email: string;
    password: string;
  }): Observable<IAuthResponse> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json");

    return this.http
      .post<IAuthResponse>("login", credentials, { headers })
      .pipe(
        tap((response: IAuthResponse) => {
          localStorage.clear();
          localStorage.setItem("token", response.token);
          localStorage.setItem("refreshToken", response.refreshToken);
        })
      );
  }

  register(user: {
    email: string;
    password: string;
    name: string;
  }): Observable<IBasicResponseMessage> {
    return this.http.post<IBasicResponseMessage>("users", user);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(["./auth"]);
  }
}
