import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoPageAction, PoSelectOption } from '@po-ui/ng-components';
import { DashboardService } from 'src/app/core/services/dashboard/dashboard.service';

@Component({
  selector: 'app-entregas',
  templateUrl: './entregas.component.html',
  styleUrls: ['./entregas.component.scss']
})
export class EntregasComponent implements OnInit {
  actions: Array<PoPageAction>;
  entregas: any[] = [];
  filteredEntregas: any[] = [];
  paginatedEntregas: any[] = [];

  motoristaOptions: Array<PoSelectOption> = [];
  statusOptions: Array<PoSelectOption> = [
    { label: 'Todos', value: 'todos' },
    { label: 'Entregue', value: 'ENTREGUE' },
    { label: 'Pendente', value: 'PENDENTE' },
    { label: 'Insucesso', value: 'INSUCESSO' }
  ];

  selectedMotorista: string = '';
  selectedStatus: string = '';

  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  paginationOptions: Array<PoSelectOption> = [];

  columns: Array<any> = [];

  constructor(
    private dashboardService: DashboardService,
    private location: Location,
    private router: Router
  ) {
    this.dashboardService.getColumnsEntregas().subscribe(columns => {
      this.columns = columns;
    });

    this.actions = this.buildActions();
  }

  ngOnInit(): void {
    this.loadEntregas();
    this.motoristaOptions = this.getUniqueMotoristas(this.entregas);
    this.updatePagination();
  }

  loadEntregas(): void {
    this.entregas = [...this.dashboardService.entregas];
    this.filteredEntregas = [...this.entregas];
  }

  onMotoristaChange(event: any): void {
    this.selectedMotorista = event;
    this.filterEntregas();
  }

  onStatusChange(event: any): void {
    this.selectedStatus = event;
    this.filterEntregas();
  }

  filterEntregas(): void {
    if (this.selectedMotorista === 'todos' && this.selectedStatus === 'todos') {
      this.filteredEntregas = [...this.entregas];
    } else {
      this.filteredEntregas = this.entregas.filter(entrega => {
        const matchesMotorista = this.selectedMotorista && this.selectedMotorista !== 'todos'
          ? entrega.motorista && entrega.motorista.nome === this.selectedMotorista
          : true;

        const matchesStatus = this.selectedStatus && this.selectedStatus !== 'todos'
          ? entrega.status_entrega === this.selectedStatus
          : true;

        return matchesMotorista && matchesStatus;
      });
    }

    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredEntregas.length / this.itemsPerPage);
    this.paginationOptions = Array.from({ length: this.totalPages }, (_, i) => ({
      label: `Página ${i + 1}`,
      value: i + 1
    }));
    this.paginate();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.paginate();
  }

  paginate(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = this.currentPage * this.itemsPerPage;
    this.paginatedEntregas = this.filteredEntregas.slice(start, end);
  }

  getUniqueMotoristas(entregas: any[]): Array<PoSelectOption> {
    const motoristas = [...new Set(entregas
      .filter(entrega => entrega.motorista && entrega.motorista.nome)
      .map(entrega => entrega.motorista.nome))];

    return [{ label: 'Todos', value: 'todos' }, ...motoristas.map(nome => ({ label: nome, value: nome }))];
  }

  private buildActions(): Array<PoPageAction> {
    return [
      { label: 'Nova Entrega', action: this.novaEntrega.bind(this) },
      { label: 'Voltar', action: this.back.bind(this) }
    ];
  }

  novaEntrega() {
    this.router.navigateByUrl('entregas/adicionar');
  }

  back() {
    this.location.back();
  }
}
