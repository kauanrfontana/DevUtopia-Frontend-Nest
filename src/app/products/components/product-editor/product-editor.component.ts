import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  IBasicResponseData,
  IBasicResponseMessage,
} from "src/app/shared/models/IBasicResponse.interfaces";
import { Product } from "src/app/shared/models/Product";
import Swal from "sweetalert2";
import { ProductsService } from "../../products.service";

@Component({
  selector: "app-product-editor",
  templateUrl: "./product-editor.component.html",
  styleUrls: ["./product-editor.component.css"],
})
export class ProductEditorComponent implements OnInit {
  btnHover: boolean = false;
  isUpdating: boolean = false;

  urlPreviewImage: string = "";

  loadingProductData: boolean = false;

  loadingLocationData: boolean = false;

  product = new Product();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params["id"]) {
        this.loadingProductData = true;
        this.isUpdating = true;
        this.getProductData(params["id"]);
      }
    });
  }

  getProductData(id: number) {
    this.loadingProductData = true;
    this.productsService.getProductById(id).subscribe({
      next: (res: IBasicResponseData<Product>) => {
        this.product.setProductData(res.data);
        this.urlPreviewImage = this.product.urlImage;
        this.loadingProductData = false;
      },
      error: (err: Error) => {
        Swal.fire("Erro ao consultar produto!", err.message, "error");
        this.loadingProductData = false;
      },
    });
  }

  saveProductData() {
    const mandatoryFields: {
      [key: string]: string;
    } = {
      name: "Nome",
      price: "Preço",
      zipCode: "CEP",
      stateId: "Estado",
      cityId: "Cidade",
      address: "Endereço",
      houseNumber: "Número da casa",
    };
    for (let key in mandatoryFields) {
      if (!this.product[key as keyof Product]) {
        Swal.fire(
          "Erro ao cadastrar produto!",
          `o campo ${mandatoryFields[key]} é obrigatório!`,
          "error"
        );
        return;
      }
    }

    if (this.isUpdating) {
      this.updateProductData();
    } else {
      this.insertProductData();
    }
  }

  insertProductData() {
    Swal.fire({
      title: "Confirmação",
      text: "Deseja realmente cadastrar este produto?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        return this.productsService.insertProduct(this.product).subscribe({
          next: (res: IBasicResponseMessage) => {
            Swal.fire("Sucesso", res.message, "success");
            this.goBack();
          },
          error: (err: Error) => {
            Swal.fire("Erro ao cadastrar produto!", err.message, "error");
          },
        });
      },
    });
  }

  updateProductData() {
    Swal.fire({
      title: "Confirmação",
      text: "Deseja realmente atualizar este produto?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        return this.productsService.updateProduct(this.product).subscribe({
          next: (res: IBasicResponseMessage) => {
            Swal.fire("Sucesso", res.message, "success");
            this.goBack();
          },
          error: (err: Error) => {
            Swal.fire("Erro ao atualizar produto!", err.message, "error");
          },
        });
      },
    });
  }

  verifyIsLoading(): boolean {
    return this.loadingProductData || this.loadingLocationData;
  }

  previewImageDoestLoaded() {
    this.urlPreviewImage = "";
    Swal.fire(
      "Erro ao carregar prévia da imagem!",
      "Link informado é inválido!",
      "error"
    );
  }

  goBack() {
    this.router.navigate(["/products/my"]);
  }
}
