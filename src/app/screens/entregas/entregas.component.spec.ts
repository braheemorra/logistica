import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntregasComponent } from './entregas.component';
import { DashboardService } from 'src/app/core/services/dashboard/dashboard.service';
import { PoFieldModule, PoPageModule, PoTableModule } from '@po-ui/ng-components';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

class MockDashboardService {
  entregas = [
    { documento: '123', motorista: { nome: 'Carlos' }, status_entrega: 'PENDENTE' },
    { documento: '456', motorista: { nome: 'Maria' }, status_entrega: 'ENTREGUE' }
  ];

  getColumnsEntregas() {
    return of([
      { property: 'motorista.nome', label: 'Motorista' },
      { property: 'documento', label: 'Documento' },
      { property: 'cliente_destino.nome', label: 'Cliente Destino' },
      {
        property: 'status_entrega', label: 'Status', type: 'label',
        labels: [
          { value: 'ENTREGUE', color: 'green', label: 'Entregue' },
          { value: 'PENDENTE', color: 'orange', label: 'Pendente' },
          { value: 'INSUCESSO', color: 'red', label: 'Insucesso' }
        ]
      }
    ]);
  }
}

describe('EntregasComponent', () => {
  let component: EntregasComponent;
  let fixture: ComponentFixture<EntregasComponent>;
  let mockDashboardService: MockDashboardService;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntregasComponent],
      imports: [
        RouterTestingModule,
        PoPageModule,
        PoTableModule,
        PoFieldModule,
        HttpClientModule,
        FormsModule
      ],
      providers: [
        { provide: DashboardService, useClass: MockDashboardService },
        Location
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EntregasComponent);
    component = fixture.componentInstance;
    mockDashboardService = TestBed.inject(DashboardService);
    location = TestBed.inject(Location);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load entregas on init', () => {
    component.ngOnInit();
    expect(component.entregas.length).toBe(2);
    expect(component.filteredEntregas.length).toBe(2);
  });

  it('should filter entregas by motorista', () => {
    component.selectedMotorista = 'Carlos';
    component.filterEntregas();
    expect(component.filteredEntregas.length).toBe(1);
    expect(component.filteredEntregas[0].motorista.nome).toBe('Carlos');
  });

  it('should filter entregas by status', () => {
    component.selectedStatus = 'ENTREGUE';
    component.filterEntregas();
    expect(component.filteredEntregas.length).toBe(1);
    expect(component.filteredEntregas[0].status_entrega).toBe('ENTREGUE');
  });

  it('should paginate entregas', () => {
    component.itemsPerPage = 1;
    component.updatePagination();
    expect(component.totalPages).toBe(2);
  });

  it('should go back when Voltar is called', () => {
    spyOn(location, 'back');
    component.back();
    expect(location.back).toHaveBeenCalled();
  });
});