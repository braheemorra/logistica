import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PoPageModule, PoTableModule, PoWidgetModule } from '@po-ui/ng-components'; // Import required modules
import { HomeComponent } from './home.component';
import { DashboardService } from 'src/app/core/services/dashboard/dashboard.service';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

class MockDashboardService {
  getMotoristaStats() {
    return [{ nome_motorista: 'Carlos Pereira', qt_entregas: 10, qt_entregas_sucedidas: 8 }];
  }

  getMotoristaInsucessoStats() {
    return [{ nome_motorista: 'João Silva', qt_entregas_insucesso: 2 }];
  }

  getBairroStats() {
    return [{ nome_bairro: 'Centro', qt_entregas: 15, qt_entregas_sucedidas: 13 }];
  }

  getColumnsDataOptions() {
    return of([
      { label: 'Nome', property: 'nome_motorista' },
      { label: 'Qtd. total de entregas', property: 'qt_entregas' },
      { label: 'Qtd. entregas sucedidas', property: 'qt_entregas_sucedidas' }
    ]);
  }

  getColumnsDataInsucessoOptions() {
    return of([
      { label: 'Nome', property: 'nome_motorista' },
      { label: 'Qtd. entregas mal sucedidas', property: 'qt_entregas_insucesso' }
    ]);
  }

  getColumnsDataBairroOptions() {
    return of([
      { label: 'Bairro', property: 'nome_bairro' },
      { label: 'Qtd. total de entregas', property: 'qt_entregas' },
      { label: 'Qtd. entregas sucedidas', property: 'qt_entregas_sucedidas' }
    ]);
  }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let dashboardService: DashboardService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        PoPageModule,
        PoTableModule,
        PoWidgetModule,
        HttpClientModule
      ],
      providers: [
        { provide: DashboardService, useClass: MockDashboardService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    dashboardService = TestBed.inject(DashboardService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load motorista stats on init', () => {
    component.loadData();
    fixture.detectChanges();
    expect(component.motoristaStats.length).toBeGreaterThan(0);
    expect(component.motoristaStats[0].nome_motorista).toBe('Carlos Pereira');
  });

  it('should load insucesso stats on init', () => {
    component.loadData();
    fixture.detectChanges();
    expect(component.motoristaInsucessoStats.length).toBeGreaterThan(0);
    expect(component.motoristaInsucessoStats[0].nome_motorista).toBe('João Silva');
  });

  it('should load bairro stats on init', () => {
    component.loadData();
    fixture.detectChanges();
    expect(component.bairroStats.length).toBeGreaterThan(0);
    expect(component.bairroStats[0].nome_bairro).toBe('Centro');
  });

  it('should load columns for motorista stats', (done) => {
    component.setupColumns();
    fixture.detectChanges();
    expect(component.motoristaColumns.length).toBeGreaterThan(0);
    expect(component.motoristaColumns[0].label).toBe('Nome');
    done();
  });

  it('should load columns for insucesso stats', (done) => {
    component.setupColumns();
    fixture.detectChanges();
    expect(component.motoristaInsucessoColumns.length).toBeGreaterThan(0);
    expect(component.motoristaInsucessoColumns[0].label).toBe('Nome');
    done();
  });

  it('should load columns for bairro stats', (done) => {
    component.setupColumns();
    fixture.detectChanges();
    expect(component.bairroColumns.length).toBeGreaterThan(0);
    expect(component.bairroColumns[0].label).toBe('Bairro');
    done();
  });
});
