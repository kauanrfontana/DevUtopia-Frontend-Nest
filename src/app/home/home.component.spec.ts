import { TestBed, fakeAsync, tick } from "@angular/core/testing";
import { HomeComponent } from "./home.component";
import { SharedModule } from "../shared/shared.module";
import { UserService } from "../shared/services/user.service";
import { of } from "rxjs";
import { User } from "../shared/models/User";

describe("Component: Home", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [SharedModule],
    });
  });

  it("should create the app", () => {
    let fixture = TestBed.createComponent(HomeComponent);
    let app = fixture.debugElement.componentInstance;

    expect(app).toBeTruthy();
  });

  it("should show slogan message", () => {
    let fixture = TestBed.createComponent(HomeComponent);
    let compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector("p").textContent).toContain(
      "Conectando apaixonados por tecnologia com os mais inovadores gadgets e acessórios - sua loja definitiva para desenvolvedores e entusiastas tecnológicos."
    );
  });

  it("should set user data at on local storage", fakeAsync(() => {
    let fixture = TestBed.createComponent(HomeComponent);
    let userService = fixture.debugElement.injector.get(UserService);
    let spy = spyOn(userService, "getUserData").and.returnValue(
      of({
        data: new User(
          1,
          "teste",
          "t@t.com",
          42,
          4216602,
          "",
          "N/A",
          "",
          "88010020",
          "customer",
          1
        ),
      })
    );
    fixture.detectChanges();
    tick();
    expect(localStorage.getItem("userData")).toBeDefined();
  }));
});
