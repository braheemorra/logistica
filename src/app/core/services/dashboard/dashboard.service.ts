import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LOGISTICA_ENTREGAS } from '../../mocks/logistica/entregas.mock';
import { IMotoristaStats } from '../../interfaces/motorista/motorista-stats.interface';
import { IMotoristaInsucessoStats } from '../../interfaces/motorista/motorista-stats-insucesso.interface';
import { IBairroStats } from '../../interfaces/motorista/bairro-stats.interface';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    entregas: any = [];

    constructor() {
        this.loadEntregas();
    }

    loadEntregas(): void {
        this.entregas = [...LOGISTICA_ENTREGAS];

        const savedEntregas = JSON.parse(localStorage.getItem('entregas') || '[]');

        const mappedEntregas = savedEntregas.map((entrega: any) => ({
            documento: entrega.documento,
            cliente_origem: {
                nome: entrega.cliente_origem_nome,
                endereco: entrega.cliente_origem_endereco,
                bairro: entrega.cliente_origem_bairro,
                cidade: entrega.cliente_origem_cidade
            },
            cliente_destino: {
                nome: entrega.cliente_destino_nome,
                endereco: entrega.cliente_destino_endereco,
                bairro: entrega.cliente_destino_bairro,
                cidade: entrega.cliente_destino_cidade
            },
            motorista: {
                nome: entrega.motorista_nome
            },
            status_entrega: entrega.status_entrega
        }));

        if (mappedEntregas && mappedEntregas.length > 0) {
            this.entregas = [...this.entregas, ...mappedEntregas];
        }
    }


    getMotoristaStats(): IMotoristaStats[] {
        this.loadEntregas();
        const motoristaMap = new Map<string, { total: number, entregues: number }>();

        this.entregas.forEach((entrega: any) => {
            const nome = entrega.motorista.nome;

            if (!motoristaMap.has(nome)) {
                motoristaMap.set(nome, { total: 0, entregues: 0 });
            }

            const stats: any = motoristaMap.get(nome);
            stats.total += 1;

            if (entrega.status_entrega === "ENTREGUE") {
                stats.entregues += 1;
            }
        });

        return Array.from(motoristaMap.entries()).map(([nome, { total, entregues }]) => ({
            nome_motorista: nome,
            qt_entregas: total,
            qt_entregas_sucedidas: entregues
        }));
    }

    getMotoristaInsucessoStats(): IMotoristaInsucessoStats[] {
        this.loadEntregas();
        const motoristaMap = new Map<string, number>();

        this.entregas.forEach((entrega: any) => {
            const nome = entrega.motorista.nome;

            if (!motoristaMap.has(nome)) {
                motoristaMap.set(nome, 0);
            }

            if (entrega.status_entrega === "INSUCESSO") {
                motoristaMap.set(nome, motoristaMap.get(nome)! + 1);
            }
        });

        return Array.from(motoristaMap.entries()).map(([nome, qt_insucesso]) => ({
            nome_motorista: nome,
            qt_entregas_insucesso: qt_insucesso
        }));
    }

    getBairroStats(): IBairroStats[] {
        this.loadEntregas();
        const bairroMap = new Map<string, { total: number; entregues: number }>();

        this.entregas.forEach((entrega: any) => {
            const bairro = entrega.cliente_destino.bairro;

            if (!bairroMap.has(bairro)) {
                bairroMap.set(bairro, { total: 0, entregues: 0 });
            }

            const stats = bairroMap.get(bairro)!;
            stats.total += 1;

            if (entrega.status_entrega === "ENTREGUE") {
                stats.entregues += 1;
            }
        });

        return Array.from(bairroMap.entries()).map(([nome_bairro, { total, entregues }]) => ({
            nome_bairro,
            qt_entregas: total,
            qt_entregas_sucedidas: entregues
        }));
    }

    getColumnsEntregas(): Observable<Array<any>> {
        const arr = [
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
        ];

        return of(arr);
    }

    getColumnsDataOptions(): Observable<Array<any>> {
        const arr = [
            { label: 'Nome', property: 'nome_motorista' },
            { label: 'Qtd. total de entregas', property: 'qt_entregas' },
            { label: 'Qtd. entregas sucedidas', property: 'qt_entregas_sucedidas' }
        ];

        return of(arr);
    }

    getColumnsDataInsucessoOptions(): Observable<Array<any>> {
        const arr = [
            { label: 'Nome', property: 'nome_motorista' },
            { label: 'Qtd. entregas mal sucedidas', property: 'qt_entregas_insucesso' }
        ];

        return of(arr);
    }

    getColumnsDataBairroOptions(): Observable<Array<any>> {
        const arr = [
            { label: 'Bairro', property: 'nome_bairro' },
            { label: 'Qtd. total de entregas', property: 'qt_entregas' },
            { label: 'Qtd. entregas sucedidas', property: 'qt_entregas_sucedidas' }
        ];

        return of(arr);
    }
}
