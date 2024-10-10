import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from '../../shared/components/components.module';

import { PoModule } from '@po-ui/ng-components';
import { EntregasRoutingModule } from './entregas-routing.module';
import { EntregasComponent } from './entregas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NovaEntregaComponent } from './nova-entrega/nova-entrega.component';


@NgModule({
  declarations: [
    EntregasComponent,
    NovaEntregaComponent
  ],
  imports: [
    CommonModule,
    PoModule,
    ComponentsModule,
    EntregasRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class EntregasModule { }
