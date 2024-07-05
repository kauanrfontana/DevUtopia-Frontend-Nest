import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { PaginationData } from "src/app/shared/models/PaginationData";
import { Review } from "src/app/shared/models/Review";
import { ProductsService, reviewInfo } from "../../products.service";
import { IPaginatedResponse } from "src/app/shared/models/IPaginatedResponse.interface";
import Swal from "sweetalert2";
import { IBasicResponseMessage } from "src/app/shared/models/IBasicResponse.interfaces";
import { UserService } from "src/app/shared/services/user.service";

@Component({
  selector: "app-product-reviews",
  templateUrl: "./product-reviews.component.html",
  styleUrls: ["./product-reviews.component.css"],
})
export class ProductReviewsComponent implements OnInit {
  reviewsList: Review[] = [];

  ownReview = new Review();
  wasPurchased: boolean = false;

  paginationData = new PaginationData();
  selfId: number = 0;
  editingReview: boolean = false;

  @Input() productId: number = 0;
  @Output() loadingReviews = new EventEmitter<boolean>(false);

  constructor(
    private productsService: ProductsService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.selfId = this.userService.userData().id;
    this.getReviewsData();
  }

  setReviewRating(value: number) {
    this.ownReview.stars = value;
  }

  getReviewsData() {
    this.loadingReviews.emit(true);
    this.productsService
      .getProductReviews(this.productId, this.paginationData)
      .subscribe({
        next: (res: IPaginatedResponse<reviewInfo>) => {
          this.reviewsList = res.data.reviews;
          this.wasPurchased = res.data.wasPurchased;
          this.paginationData.totalItems = res.totalItems;
          this.loadingReviews.emit(false);
        },
        error: (err: Error) => {
          Swal.fire("Erro ao consultar avaliações!", err.message, "error");
          this.loadingReviews.emit(false);
        },
      });
  }

  onStartEditReview(reviewId: number) {
    this.editingReview = true;
    this.ownReview = this.reviewsList.find(
      (review: Review) => review.id == reviewId
    ) as Review;
  }

  onCancelEditReview() {
    this.ownReview = new Review();
    this.editingReview = false;
  }

  updateReview() {
    if (!this.ownReview.review) {
      Swal.fire(
        "Erro ao alterar avaliação!",
        "o campo escreva sua avaliação é obrigatório!",
        "error"
      );
      return;
    }
    if (!this.ownReview.stars) {
      Swal.fire(
        "Erro ao alterar avaliação!",
        "o campo quantidade de estrelas é obrigatório!",
        "error"
      );
      return;
    }

    Swal.fire({
      title: "Confirmação",
      text: "Deseja realmente alterar esta avaliação?",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Confirmar",
      preConfirm: () => {
        return this.productsService
          .updateReview(this.productId, this.ownReview)
          .subscribe({
            next: (res: IBasicResponseMessage) => {
              Swal.fire("Sucesso", res.message, "success");
              this.onCancelEditReview();
              this.getReviewsData();
            },
            error: (err: Error) => {
              Swal.fire("Erro ao alterar avaliação!", err.message, "error");
            },
          });
      },
    });
  }

  insertReview() {
    if (!this.wasPurchased) {
      Swal.fire(
        "Erro ao adicionar avaliação!",
        "É necessário comprar o produto antes de inserir uma avaliação",
        "error"
      );
      return;
    }
    if (!this.ownReview.review) {
      Swal.fire(
        "Erro ao adicionar avaliação!",
        "o campo descreva a avaliação é obrigatório!",
        "error"
      );
      return;
    }
    if (!this.ownReview.stars) {
      Swal.fire(
        "Erro ao adicionar avaliação!",
        "o campo estrelas é obrigatório!",
        "error"
      );
      return;
    }
    Swal.fire({
      title: "Confirmação",
      text: "Deseja realmente cadastrar esta avaliação?",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Confirmar",
      preConfirm: () => {
        this.productsService
          .insertReview(this.productId, this.ownReview)
          .subscribe({
            next: (res: IBasicResponseMessage) => {
              Swal.fire("Sucesso", res.message, "success");
              this.ownReview = new Review();
              this.getReviewsData();
            },
            error: (err: Error) => {
              Swal.fire("Erro ao adicionar avaliação!", err.message, "error");
            },
          });
      },
    });
  }

  pageChanged(event: any) {
    this.paginationData = {
      ...this.paginationData,
      currentPage: event.pageIndex + 1,
      itemsPerPage: event.pageSize,
    };
    this.getReviewsData();
  }
}
