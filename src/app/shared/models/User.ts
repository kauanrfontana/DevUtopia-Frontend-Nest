import { LocationData } from "../components/location/location.component";

export class User {
  constructor(
    public id: number = 0,
    public name: string = "",
    public email: string = "",
    public stateId: number = 0,
    public cityId: number = 0,
    public address: string = "",
    public houseNumber: string = "",
    public complement: string = "",
    public zipCode: string = "",
    public role: string = "",
    public roleCategory: number = 0
  ) {}

  getLocationData(): LocationData {
    return {
      stateId: this.stateId,
      cityId: this.cityId,
      address: this.address,
      houseNumber: this.houseNumber,
      complement: this.complement,
      zipCode: this.zipCode,
    };
  }

  setUserData(userData: User) {
    this.id = userData.id;
    this.name = userData.name;
    this.email = userData.email;
    this.stateId = userData.stateId;
    this.cityId = userData.cityId;
    this.address = userData.address;
    this.houseNumber = userData.houseNumber;
    this.complement = userData.complement;
    this.zipCode = userData.zipCode;
    this.role = userData.role;
    this.roleCategory = userData.roleCategory;
  }

  setLocationData(locationData: LocationData) {
    this.stateId = locationData.stateId;
    this.cityId = locationData.cityId;
    this.address = locationData.address;
    this.houseNumber = locationData.houseNumber;
    this.complement = locationData.complement;
    this.zipCode = locationData.zipCode;
  }
}
