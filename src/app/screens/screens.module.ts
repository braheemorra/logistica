import { NgModule } from '@angular/core';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';

@NgModule({
  exports: [
    LoginModule,
    HomeModule
  ],
  declarations: [
  ]
})
export class ScreensModule { }
