import { AppService } from "./../../app.service";
import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";

@Injectable({ providedIn: "root" })
export class InterceptService implements HttpInterceptor {
  constructor(private router: Router, private appService: AppService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const isRegister: boolean =
      request.url == "users" && request.method == "post";
    const hasToken = request.url != "login" && !isRegister;

    request = request.clone({
      url: environment.serverUrl + `${request.url}`,
    });

    if (hasToken) {
      request = request.clone({
        setHeaders: {
          "Content-Type": "application/json",
          "X-Auth-Token": localStorage.getItem("token") || "",
          "X-Refresh-Token": localStorage.getItem("refreshToken") || "",
        },
      });
    }

    return next.handle(request).pipe(
      tap((response) => {
        if (response instanceof HttpResponse && hasToken) {
          this.RefreshToken(response);
        }
      }),
      catchError((err) => {
        if (err.status !== 401 && hasToken) {
          this.RefreshToken(err);
        }
        if (err.status === 401 && hasToken) {
          setTimeout(() => {
            Swal.fire({
              title: "Sessão Expirada!",
              text: "Por favor, faça login novamente no sistema.",
              icon: "error",
            }).then(() => {
              localStorage.clear();
              this.appService.verifyMenuSubject.next(false);
              this.router.navigate([""]);
            });
          }, 1);
        }

        const error = err.error || err.statusText;
        return throwError(error);
      })
    );
  }

  RefreshToken(response: HttpResponse<any>) {
    const authToken = response.headers.get("X-Auth-Token");
    const refreshToken = response.headers.get("X-Refresh-Token");
    if (authToken !== null && refreshToken !== null) {
      localStorage.setItem("token", authToken);
      localStorage.setItem("refreshToken", refreshToken);
    }
  }
}
