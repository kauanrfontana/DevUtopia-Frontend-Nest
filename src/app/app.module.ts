import { LOCALE_ID, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SharedModule } from "./shared/shared.module";
import { CommonModule, registerLocaleData } from "@angular/common";
import { AuthModule } from "./auth/auth.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import localePt from "@angular/common/locales/pt";
import { StoreModule } from "@ngrx/store";
import * as fromApp from "./store/app.reducer";
import { EffectsModule } from "@ngrx/effects";
import { ShoppingCartEffects } from "./shared/shopping-cart/store/shopping-cart.effects";
import { ProductsReducerEffects } from "./products/store/products.effects";

registerLocaleData(localePt);
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CommonModule,
    AuthModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([ShoppingCartEffects, ProductsReducerEffects]),
  ],
  providers: [{ provide: LOCALE_ID, useValue: "pt" }],
  bootstrap: [AppComponent],
})
export class AppModule {}
