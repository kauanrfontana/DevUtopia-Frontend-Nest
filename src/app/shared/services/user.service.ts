import { User } from "../models/User";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  IBasicResponseData,
  IBasicResponseMessage,
} from "../models/IBasicResponse.interfaces";
import { Observable } from "rxjs";
import { PaginationData } from "../models/PaginationData";
import { IPaginatedResponse } from "../models/IPaginatedResponse.interface";

@Injectable({ providedIn: "root" })
export class UserService {
  userData = (): User => {
    let userData = localStorage.getItem("userData");
    if (userData) return JSON.parse(userData);
    return new User();
  };

  constructor(private http: HttpClient) {}

  getUserData(userId: number): Observable<IBasicResponseData<User>> {
    return this.http.get<IBasicResponseData<User>>(`users/${userId}`);
  }

  getAllUsersData(
    name: string,
    paginationData: PaginationData
  ): Observable<IPaginatedResponse<User[]>> {
    return this.http.get<IPaginatedResponse<User[]>>("users", {
      params: { ...paginationData, name },
    });
  }

  isAdmin() {
    return this.userData().roleCategory === 3;
  }

  updateUserData(user: User): Observable<IBasicResponseMessage> {
    return this.http.put<IBasicResponseMessage>("users", user);
  }

  updatePassword(changePasswordData: {
    currentPassword: string;
    newPassword: string;
  }): Observable<IBasicResponseMessage> {
    return this.http.put<IBasicResponseMessage>(
      "users/password",
      changePasswordData
    );
  }

  updateUserRole(
    newRoleCategory: number,
    userId?: number
  ): Observable<IBasicResponseMessage> {
    let paramUserId = "";
    if (userId) paramUserId = `/${userId}`;
    return this.http.put<IBasicResponseMessage>(
      "users/userRole" + paramUserId,
      {
        newRoleCategory,
      }
    );
  }

  deleteUserById(userId: number): Observable<IBasicResponseMessage> {
    return this.http.delete<IBasicResponseMessage>("users/" + userId);
  }
}
