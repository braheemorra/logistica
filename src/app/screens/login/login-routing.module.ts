import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { AnonymousGuard } from 'src/app/core/guards/auth/anonymous.guard';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        canActivate: [AnonymousGuard]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
