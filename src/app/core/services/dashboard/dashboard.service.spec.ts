import { TestBed } from '@angular/core/testing';
import { DashboardService } from './dashboard.service';
import { LOGISTICA_ENTREGAS } from '../../mocks/logistica/entregas.mock';

describe('DashboardService', () => {
  let service: DashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashboardService],
    });
    service = TestBed.inject(DashboardService);

    const mockLocalStorage = {
      getItem: jasmine.createSpy('getItem').and.callFake((key: string) => {
        if (key === 'entregas') {
          return JSON.stringify([{
            documento: '12345',
            cliente_origem_nome: 'Cliente Teste',
            cliente_origem_endereco: 'Rua Teste',
            cliente_destino_nome: 'Destino Teste',
            cliente_destino_endereco: 'Rua Destino',
            motorista_nome: 'Motorista Teste',
            status_entrega: 'PENDENTE',
          }]);
        }
        return null;
      }),
      setItem: jasmine.createSpy('setItem'),
    };
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load entregas from localStorage and merge with LOGISTICA_ENTREGAS', () => {
    service.loadEntregas();
    expect(service.entregas.length).toBeGreaterThan(0);
    expect(service.entregas.some((e: any) => e.documento === '12345')).toBeTrue();
  });

  it('should return motorista stats', () => {
    const stats = service.getMotoristaStats();
    expect(stats.length).toBeGreaterThan(0);
    expect(stats[0].nome_motorista).toBeTruthy();
  });

  it('should return insucesso stats', () => {
    const stats = service.getMotoristaInsucessoStats();
    expect(stats.length).toBeGreaterThan(0);
  });

  it('should return bairro stats', () => {
    const stats = service.getBairroStats();
    expect(stats.length).toBeGreaterThan(0);
  });

  it('should return column data for entregas', (done) => {
    service.getColumnsEntregas().subscribe(columns => {
      expect(columns.length).toBeGreaterThan(0);
      expect(columns[0].property).toBe('motorista.nome');
      done();
    });
  });
});
