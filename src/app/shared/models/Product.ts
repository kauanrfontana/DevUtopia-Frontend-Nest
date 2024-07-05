import { LocationData } from "../components/location/location.component";

export class Product {
  constructor(
    public id: number = 0,
    public userId: number = 0,
    public name: string = "",
    public price: number = 0,
    public description: string = "",
    public urlImage: string = "",
    public stateId: number = 0,
    public cityId: number = 0,
    public address: string = "",
    public houseNumber: string = "",
    public complement: string = "",
    public zipCode: string = ""
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

  setProductData(productData: Product) {
    this.id = productData.id;
    this.userId = productData.userId;
    this.name = productData.name;
    this.price = productData.price;
    this.description = productData.description;
    this.urlImage = productData.urlImage;
    this.stateId = productData.stateId;
    this.cityId = productData.cityId;
    this.address = productData.address;
    this.houseNumber = productData.houseNumber;
    this.complement = productData.complement;
    this.zipCode = productData.zipCode;
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
