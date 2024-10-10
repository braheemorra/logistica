import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PoPageAction } from '@po-ui/ng-components';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nova-entrega',
  templateUrl: './nova-entrega.component.html',
  styleUrls: ['./nova-entrega.component.scss']
})
export class NovaEntregaComponent implements OnInit {
  actions: Array<PoPageAction>;
  entregaForm: FormGroup;

  documentPattern = /^[0-9]{1,14}$/;

  motoristaOptions = [
    { label: 'Carlos Pereira', value: 'Carlos Pereira' },
    { label: 'Carla Souza', value: 'Carla Souza' },
    { label: 'Maria Oliveira', value: 'Maria Oliveira' },
    { label: 'João Silva', value: 'João Silva' }
  ];

  constructor(
    private location: Location,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.actions = this.buildActions();

    this.entregaForm = this.fb.group({
      documento: ['', [Validators.required, Validators.pattern(this.documentPattern)]],
      cliente_origem_nome: ['', Validators.required],
      cliente_origem_endereco: ['', Validators.required],
      cliente_origem_bairro: ['', Validators.required],
      cliente_origem_cidade: ['', Validators.required],
      cliente_destino_nome: ['', Validators.required],
      cliente_destino_endereco: ['', Validators.required],
      cliente_destino_bairro: ['', Validators.required],
      cliente_destino_cidade: ['', Validators.required],
      motorista_nome: ['', Validators.required],
      status_entrega: ['PENDENTE']
    });

    this.entregaForm.statusChanges.subscribe(() => {
      this.actions[0].disabled = !this.entregaForm.valid;
    });
  }

  ngOnInit(): void { }
  
  private buildActions(): Array<PoPageAction> {
    return [
      { label: 'Salvar', action: this.save.bind(this), disabled: true },
      { label: 'Voltar', action: this.back.bind(this) }
    ];
  }

  save() {
    if (this.entregaForm.valid) {
      const newEntrega = {
        id: this.generateId(),
        ...this.entregaForm.value,
        cliente_origem: {
          nome: this.entregaForm.value.cliente_origem_nome,
          endereco: this.entregaForm.value.cliente_origem_endereco,
          bairro: this.entregaForm.value.cliente_origem_bairro,
          cidade: this.entregaForm.value.cliente_origem_cidade
        },
        cliente_destino: {
          nome: this.entregaForm.value.cliente_destino_nome,
          endereco: this.entregaForm.value.cliente_destino_endereco,
          bairro: this.entregaForm.value.cliente_destino_bairro,
          cidade: this.entregaForm.value.cliente_destino_cidade
        },
        motorista: {
          nome: this.entregaForm.value.motorista_nome
        }
      };

      const currentEntregas = JSON.parse(localStorage.getItem('entregas') || '[]');

      currentEntregas.push(newEntrega);
      localStorage.setItem('entregas', JSON.stringify(currentEntregas));

      this.router.navigateByUrl('entregas');
    }
  }

  generateId(): string {
    const currentDate = new Date();
    return currentDate.getTime().toString();
  }

  back() {
    this.location.back();
  }
}
