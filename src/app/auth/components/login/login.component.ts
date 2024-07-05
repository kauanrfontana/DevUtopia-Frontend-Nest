import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { AuthService } from "../../auth.service";
import { take } from "rxjs";
import { Router } from "@angular/router";
import { AppService } from "src/app/app.service";
import { IBasicResponseMessage } from "src/app/shared/models/IBasicResponse.interfaces";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  pageLoading: boolean = false;
  inLogin: boolean = false;
  inRegister: boolean = false;

  registerClasses = {
    preview: "container-register-preview",
    selected: "register-page",
  };
  registerClass: string = "";
  loginClasses = {
    preview: "container-login-preview",
    selected: "login-page",
  };
  loginClass: string = "";
  logoClasses = {
    right: "logo-right",
  };
  logoClass: string = "";

  registerForm: FormGroup = new FormGroup({});
  loginForm: FormGroup = new FormGroup({});

  passwordsVisible = false;

  constructor(
    private authService: AuthService,
    private appService: AppService,
    private router: Router
  ) {}

  onPreviewRegister() {
    if (this.registerClass === this.registerClasses.selected) return;
    this.registerClass =
      this.registerClass == this.registerClasses.preview
        ? ""
        : this.registerClasses.preview;

    this.logoClass =
      this.logoClass == this.logoClasses.right ? "" : this.logoClasses.right;
  }

  onPreviewLogin() {
    if (this.loginClass === this.loginClasses.selected) return;
    this.loginClass =
      this.loginClass == this.loginClasses.preview
        ? ""
        : this.loginClasses.preview;
  }

  onRegister() {
    this.registerClass = this.registerClasses.selected;
    this.initRegisterForm();
  }

  initRegisterForm() {
    this.registerForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        this.strongPasswordValidator.bind(this),
      ]),
      passwordConfirm: new FormControl(null, Validators.required),
    });
  }

  initLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onRegisterUser() {
    if (this.registerForm.get("name")?.invalid) {
      Swal.fire(
        "Erro ao Cadastrar",
        "Nome inválido, preencha o campo corretamente para efetuar o cadastro!",
        "error"
      );
      return;
    }
    if (this.registerForm.get("email")?.invalid) {
      Swal.fire(
        "Erro ao Cadastrar",
        "E-mail inválido, preencha o campo corretamente para efetuar o cadastro!",
        "error"
      );
      return;
    }

    if (this.registerForm.get("password")?.invalid) {

      Swal.fire("Erro ao Cadastrar", "A senha deve ter no mínimo 6 caracteres, conter letras maiúsculas, minúsculas, números e caracteres especiais!", "error");
      return;
    }
    if (
      this.passwordDoesntMatch(
        this.registerForm.get("passwordConfirm") as FormControl<string>
      )
    ) {
      Swal.fire(
        "Erro ao Cadastrar",
        "A senha e a confirmação não correspondem!",
        "error"
      );
      return;
    }

    let { name, email, password } = this.registerForm.value;
    let user = { name, email, password };
    this.pageLoading = true;
    this.authService
      .register(user)
      .pipe(take(1))
      .subscribe({
        next: (res: IBasicResponseMessage) => {
          this.pageLoading = false;
          Swal.fire("Sucesso", res.message, "success").then(() => {
            this.restart();
          });
        },
        error: (err: Error) => {
          this.pageLoading = false;
          Swal.fire("Erro ao Cadastrar", err.message, "error");
        },
      });
  }

  onLoginUser() {
    if (this.loginForm.get("email")?.invalid) {
      Swal.fire(
        "Erro ao fazer login",
        "E-mail inválido, preencha o campo corretamente para efetuar o login!",
        "error"
      );
      return;
    }

    if (this.loginForm.get("password")?.invalid) {
      Swal.fire("Erro ao fazer Login", "A senha deve ter no mínimo 6 caracteres", "error");
      return;
    }

    let { email, password } = this.loginForm.value;
    let credentials = { email, password };
    this.pageLoading = true;
    this.authService.login(credentials).subscribe({
      next: () => {
        this.pageLoading = false;
        this.router.navigate(["./home"]);
        this.appService.verifyMenuSubject.next(true);
      },
      error: (err: Error) => {
        this.pageLoading = false;
        Swal.fire("Erro ao fazer Login", err.message, "error");
      },
    });
  }

  onLogin() {
    this.loginClass = this.loginClasses.selected;

    this.initLoginForm();
  }

  passwordDoesntMatch(control: FormControl): boolean {
    if (control.value !== this.registerForm.get("password")?.value) {
      return true;
    }
    return false;
  }

  strongPasswordValidator(control: FormControl): {[s: string]: boolean} | null {
    const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(control.value);
    const hasUppercase = /[A-Z]/.test(control.value);
    const hasLowercase = /[a-z]/.test(control.value);
    const hasNumber = /\d/.test(control.value)

    if(String(control.value).length < 6 || !specialCharacters || !hasUppercase || !hasLowercase || !hasNumber ){
      return {"strongPasswordValidator": true};
    };
    return null;
  }

  restart() {
    this.loginClass = "";
    this.registerClass = "";
    this.logoClass = "";
    this.passwordsVisible = false;
  }
}
