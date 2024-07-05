import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IBasicResponseData } from "../models/IBasicResponse.interfaces";

export interface ILocation {
  id: number;
  name: string;
}
@Injectable({ providedIn: "root" })
export class LocationSevice {
  constructor(private http: HttpClient) {}

  getStates(stateId?: number): Observable<IBasicResponseData<ILocation[]>> {
    const url = stateId
      ? `locations/states?stateId=${stateId}`
      : `locations/states`;
    return this.http.get<IBasicResponseData<ILocation[]>>(url);
  }

  getCitiesByState(
    stateId: number
  ): Observable<IBasicResponseData<ILocation[]>> {
    return this.http.get<IBasicResponseData<ILocation[]>>("locations/cities", {
      params: { stateId },
    });
  }

  getLocationByCep(cep: string): Observable<
    IBasicResponseData<{
      address: string;
      city: string;
      state: string;
    }>
  > {
    return this.http.get<
      IBasicResponseData<{
        address: string;
        city: string;
        state: string;
      }>
    >("locations/cep/" + cep);
  }
}
