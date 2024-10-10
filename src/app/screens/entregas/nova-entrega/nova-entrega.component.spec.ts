import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PoDividerModule, PoFieldModule, PoNotificationService, PoPageModule } from '@po-ui/ng-components';
import { NovaEntregaComponent } from './nova-entrega.component';

describe('NovaEntregaComponent', () => {
  let component: NovaEntregaComponent;
  let fixture: ComponentFixture<NovaEntregaComponent>;
  let locationMock: any;
  let routerMock: any;

  beforeEach(async () => {
    locationMock = {
      back: jasmine.createSpy('back')
    };

    routerMock = {
      navigateByUrl: jasmine.createSpy('navigateByUrl')
    };

    await TestBed.configureTestingModule({
      declarations: [NovaEntregaComponent],
      imports: [
        ReactiveFormsModule,
        PoPageModule,
        PoDividerModule,
        PoFieldModule
      ],
      providers: [
        { provide: Location, useValue: locationMock },
        { provide: Router, useValue: routerMock },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NovaEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable save button when form is invalid', () => {
    expect(component.actions[0].disabled).toBeTrue();
  });

  it('should enable save button when form is valid', () => {
    component.entregaForm.patchValue({
      documento: '123456',
      cliente_origem_nome: 'Test Origem',
      cliente_origem_endereco: 'Rua Teste',
      cliente_origem_bairro: 'Bairro Teste',
      cliente_origem_cidade: 'Cidade Teste',
      cliente_destino_nome: 'Test Destino',
      cliente_destino_endereco: 'Rua Destino',
      cliente_destino_bairro: 'Bairro Destino',
      cliente_destino_cidade: 'Cidade Destino',
      motorista_nome: 'Carlos Pereira'
    });

    fixture.detectChanges();
    expect(component.actions[0].disabled).toBeFalse();
  });

  it('should call router.navigateByUrl after saving valid form', () => {
    spyOn(localStorage, 'setItem');
    component.entregaForm.patchValue({
      documento: '123456',
      cliente_origem_nome: 'Test Origem',
      cliente_origem_endereco: 'Rua Teste',
      cliente_origem_bairro: 'Bairro Teste',
      cliente_origem_cidade: 'Cidade Teste',
      cliente_destino_nome: 'Test Destino',
      cliente_destino_endereco: 'Rua Destino',
      cliente_destino_bairro: 'Bairro Destino',
      cliente_destino_cidade: 'Cidade Destino',
      motorista_nome: 'Carlos Pereira'
    });

    component.save();

    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('entregas');
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('should call location.back when back button is clicked', () => {
    component.back();
    expect(locationMock.back).toHaveBeenCalled();
  });
});