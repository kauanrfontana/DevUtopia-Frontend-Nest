import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { IListItem } from "../search-select/IListItem.interface";
import { IBasicResponseData } from "../../models/IBasicResponse.interfaces";
import { ILocation, LocationSevice } from "../../services/location.service";
import { Observable, debounceTime, map } from "rxjs";
import Swal from "sweetalert2";
import { FormControl } from "@angular/forms";

export class LocationData {
  constructor(
    public stateId: number = 0,
    public cityId: number = 0,
    public address: string = "",
    public houseNumber: string = "",
    public complement: string = "",
    public zipCode: string = ""
  ) {}
}
@Component({
  selector: "app-location",
  templateUrl: "./location.component.html",
  styleUrls: ["./location.component.css"],
})
export class LocationComponent implements OnInit {
  @Input() data = new LocationData();
  @Output() dataChanged = new EventEmitter<LocationData>();
  @Input() isEditing: boolean = false;
  @Output() loadingData = new EventEmitter<boolean>();

  loadingCepSearch: boolean = false;

  btnHover: boolean = false;

  cepControl: FormControl = new FormControl("");

  states: IListItem[] = [];
  cities: IListItem[] = [];

  constructor(private locationService: LocationSevice) {}

  ngOnInit() {
    this.cepControl.setValue(String(this.data.zipCode));
    this.cepControlValueChanges();
    this.getStates();
    if (this.data.stateId) {
      this.getCitiesByState(this.data.stateId).subscribe({
        next: (res: IBasicResponseData<IListItem[]>) => {
          this.cities = res.data;
          this.loadingData.emit(false);
        },
        error: (err: Error) => {
          Swal.fire("Erro ao consultar cidades!", err.message, "error");
          this.loadingData.emit(false);
        },
      });
    } else {
      this.loadingData.emit(false);
    }
  }

  cepControlValueChanges() {
    this.cepControl.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((value: string) => {
        if (value.length == 8) {
          this.data.zipCode = value;
          this.dataChanged.emit(this.data);
          this.searchLocationByCep(value);
        }
      });
  }

  searchLocationByCep(cep: string) {
    this.loadingCepSearch = true;

    this.locationService.getLocationByCep(cep).subscribe({
      next: (
        res: IBasicResponseData<{
          address: string;
          city: string;
          state: string;
        }>
      ) => {
        this.data.address = res.data.address;
        this.dataChanged.emit(this.data);
        this.data.stateId = Number(
          this.states.find((state) => state.label == res.data.state)?.id
        );
        this.dataChanged.emit(this.data);
        this.getCitiesByState(this.data.stateId).subscribe({
          next: (res2: IBasicResponseData<IListItem[]>) => {
            this.cities = res2.data;
            this.data.cityId = Number(
              this.cities.find((city) => city.label == res.data.city)?.id
            );
            this.dataChanged.emit(this.data);
            this.loadingCepSearch = false;
          },
          error: (err: Error) => {
            Swal.fire("Erro ao consultar cidades!", err.message, "error");
          },
        });
      },
      error: (err: Error) => {
        Swal.fire("Erro ao consultar cep!", err.message, "error");
        this.loadingCepSearch = false;
      },
    });
  }

  getStates() {
    this.locationService.getStates().subscribe({
      next: (res: IBasicResponseData<ILocation[]>) => {
        this.states = res.data.map((state: { id: number; name: string }) => ({
          id: state.id,
          label: state.name,
        }));
      },
      error: (err: Error) => {
        Swal.fire("Erro ao consultar países!", err.message, "error");
      },
    });
  }

  getCitiesByState(
    stateId: number
  ): Observable<IBasicResponseData<IListItem[]>> {
    return this.locationService.getCitiesByState(stateId).pipe(
      map((response: IBasicResponseData<ILocation[]>) => {
        return {
          data: response.data.map((city: { id: number; name: string }) => ({
            id: city.id,
            label: city.name,
          })),
        };
      })
    );
  }

  onStateChange(stateId: number) {
    this.cities = [];
    this.dataChanged.emit(this.data);
    this.getCitiesByState(stateId).subscribe({
      next: (res: IBasicResponseData<IListItem[]>) => {
        this.cities = res.data;
      },
      error: (err: Error) => {
        Swal.fire("Erro ao consultar cidades!", err.message, "error");
      },
    });
  }

  getStateLabelById(id: number): string | undefined {
    return this.states.find((state) => state?.id == +id)?.label;
  }

  getCityLabelById(id: number): string | undefined {
    return this.cities.find((city) => city?.id == +id)?.label;
  }
}
