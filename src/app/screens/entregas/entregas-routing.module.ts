import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntregasComponent } from './entregas.component';
import { AuthGuard } from 'src/app/core/guards/auth/auth.guard';
import { NovaEntregaComponent } from './nova-entrega/nova-entrega.component';

const routes: Routes = [
  { path: '', component: EntregasComponent, canActivate: [AuthGuard]},
  { path: 'adicionar', component: NovaEntregaComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntregasRoutingModule { }
