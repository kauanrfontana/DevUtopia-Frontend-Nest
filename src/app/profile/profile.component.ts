import { Component, OnInit } from "@angular/core";
import { User } from "../shared/models/User";
import { UserService } from "../shared/services/user.service";
import {
  IBasicResponseData,
  IBasicResponseMessage,
} from "../shared/models/IBasicResponse.interfaces";
import Swal from "sweetalert2";
import { PaginationData } from "../shared/models/PaginationData";
import { IPaginatedResponse } from "../shared/models/IPaginatedResponse.interface";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  isEditing: boolean = false;
  btnHover: boolean = false;

  user = new User();

  users = new Array<User>();

  currentPassword: string = "";
  newPassword: string = "";

  loadingUserData: boolean = false;
  loadingUsersData: boolean = false;
  loadingLocationData: boolean = false;

  paginationData = new PaginationData();

  isAdmin: boolean = false;

  searchName: string = "";

  constructor(private userService: UserService) {
    this.isAdmin = this.userService.isAdmin();
  }

  ngOnInit(): void {
    this.isEditing = false;

    this.getUserData();

    if (this.isAdmin) this.getAllUsersData();
  }

  getAllUsersData() {
    this.loadingUsersData = true;
    this.userService
      .getAllUsersData(this.searchName, this.paginationData)
      .subscribe({
        next: (res: IPaginatedResponse<User[]>) => {
          this.users = res.data;
          this.loadingUsersData = false;
          this.paginationData.totalItems = res.totalItems;
        },
        error: (err: Error) => {
          Swal.fire("Erro ao consultar usuários!", err.message, "error");
          this.loadingUsersData = false;
        },
      });
  }

  getUserData() {
    this.loadingUserData = true;
    this.userService.getUserData(0).subscribe({
      next: (res: IBasicResponseData<User>) => {
        this.user.setUserData(res.data);
        localStorage.setItem("userData", JSON.stringify(this.user));
        this.loadingUserData = false;
      },
      error: (err: Error) => {
        Swal.fire("Erro ao consultar usuário!", err.message, "error");
        this.loadingUserData = false;
      },
    });
  }

  verifyIsLoading(): boolean {
    return (
      this.loadingUserData || this.loadingUsersData || this.loadingLocationData
    );
  }

  onUpdateUserData() {
    Swal.fire({
      title: "Confirmação",
      text: "Deseja realmente atualizar seus dados?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        return this.userService.updateUserData(this.user).subscribe({
          next: (res: IBasicResponseMessage) => {
            Swal.fire("Sucesso", res.message, "success").then(() => {
              this.ngOnInit();
            });
          },
          error: (err: Error) => {
            Swal.fire("Erro ao atualizar usuário!", err.message, "error");
          },
        });
      },
    });
  }

  onUpdatePassword() {
    Swal.fire({
      title: "Alteração de Senha",
      html: `
          <div class="form-group" style="margin: 1rem;">
          <input
            type="text"
            class="form-control"
            placeholder=""
            id="currentPassword"
          />
          <label>Senha Atual</label>
          </div>
          <div class="form-group" style="margin: 1rem;">
          <input
            type="text"
            class="form-control"
            placeholder=""
            id="newPassword"
          />
          <label>Nova Senha</label>
          </div>
      `,
      confirmButtonText: "Alterar",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.dismiss) {
        return;
      }
      if (this.isNotStrongPasswordValidator(this.newPassword)) {
        Swal.fire(
          "Erro ao atualizar senha!",
          "A senha deve ter no mínimo 6 caracteres, conter letras maiúsculas, minúsculas, números e caracteres especiais!",
          "error"
        );
        return;
      }

      this.userService
        .updatePassword({
          currentPassword: this.currentPassword,
          newPassword: this.newPassword,
        })
        .subscribe({
          next: (res: IBasicResponseMessage) => {
            Swal.fire("Sucesso", res.message, "success");
          },
          error: (err: Error) => {
            Swal.fire("Erro ao atualizar senha!", err.message, "error");
          },
        });
    });

    const $currentPasswordInput = document.getElementById(
      "currentPassword"
    ) as HTMLInputElement;
    $currentPasswordInput?.addEventListener("input", () => {
      this.currentPassword = $currentPasswordInput.value;
    });
    const $newPasswordInput = document.getElementById(
      "newPassword"
    ) as HTMLInputElement;
    $newPasswordInput?.addEventListener("input", () => {
      this.newPassword = $newPasswordInput.value;
    });
  }

  updateRoleToSeller() {
    this.userService.updateUserRole(2).subscribe({
      next: (res: IBasicResponseMessage) => {
        Swal.fire("Sucesso", res.message, "success").then(() => {
          this.ngOnInit();
        });
      },
      error: (err: Error) => {
        Swal.fire("Erro ao consultar cep!", err.message, "error");
      },
    });
  }

  changeEditState() {
    if (this.isEditing) {
      this.ngOnInit();
    } else {
      this.isEditing = !this.isEditing;
    }
  }

  onDeleteUser(id: number) {
    Swal.fire({
      title: "Confirmação",
      text: "Deseja realmente deletar este usuário?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        return this.userService.deleteUserById(id).subscribe({
          next: (res: IBasicResponseMessage) => {
            Swal.fire("Sucesso", res.message, "success").then(() => {
              this.ngOnInit();
            });
          },
          error: (err: Error) => {
            Swal.fire("Erro ao deletar usuário!", err.message, "error");
          },
        });
      },
    });
  }

  isNotStrongPasswordValidator(value: string): boolean {
    const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
      value
    );
    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);

    if (
      value.length < 6 ||
      !specialCharacters ||
      !hasUppercase ||
      !hasLowercase ||
      !hasNumber
    ) {
      return true;
    }
    return false;
  }

  pageChanged(event: any) {
    this.paginationData = {
      ...this.paginationData,
      currentPage: event.pageIndex + 1,
      itemsPerPage: event.pageSize,
    };

    this.getAllUsersData();
  }
}
