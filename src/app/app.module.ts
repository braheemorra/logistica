import { registerLocaleData } from "@angular/common";
import localeEn from '@angular/common/locales/en';
import localeEs from '@angular/common/locales/es';
import localeEnExtra from '@angular/common/locales/extra/en';
import localeEsExtra from '@angular/common/locales/extra/es';
import localePtExtra from '@angular/common/locales/extra/pt';
import localePt from '@angular/common/locales/pt';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { PoModule } from '@po-ui/ng-components';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnonymousGuard } from './core/guards/auth/anonymous.guard';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { ScreensModule } from './screens/screens.module';
import { ComponentsModule } from "./shared/components/components.module";
import { HttpClientModule } from "@angular/common/http";

registerLocaleData(localeEn, 'en', localeEnExtra);
registerLocaleData(localePt, 'pt', localePtExtra);
registerLocaleData(localeEs, 'es', localeEsExtra);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([]),
    PoModule,
    PoTemplatesModule,
    ScreensModule,
    BrowserAnimationsModule,
    ComponentsModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    AnonymousGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
