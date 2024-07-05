import { Product } from "./Product";

export class ShoppingCart {
  constructor(
    public userId: number = 0,
    public products: Product[] = [],
    public qtdProducts: number = 0,
    public totalPrice: number = 0
  ) {}
}
